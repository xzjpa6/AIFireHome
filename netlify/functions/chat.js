// Netlify Function for DeepSeek API proxy
// 处理 /api/chat-completions 请求
exports.handler = async (event, context) => {
  // 设置CORS头
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  }

  // 处理OPTIONS预检请求
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const body = JSON.parse(event.body)
    const apiKey = process.env.DEEPSEEK_API_KEY

    console.log('接收到请求: 使用服务端密钥调用', {
      hasServerKey: !!apiKey
    })

    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: '服务器未配置 DEEPSEEK_API_KEY 环境变量' })
      }
    }

    // 转发到DeepSeek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    })

    const responseText = await response.text()
    console.log('DeepSeek API响应:', {
      status: response.status,
      statusText: response.statusText,
      responseLength: responseText.length,
      responsePreview: responseText.substring(0, 200)
    })

    return {
      statusCode: response.status,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: responseText
    }

  } catch (error) {
    console.error('代理函数错误:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: '代理函数错误',
        message: error.message 
      })
    }
  }
}