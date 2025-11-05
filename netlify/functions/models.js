// Netlify Function for testing DeepSeek API key validity (using server env)
exports.handler = async (event, context) => {
  // 设置CORS头
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
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

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const apiKey = process.env.DEEPSEEK_API_KEY

    console.log('服务端密钥检测: ', apiKey ? '已配置' : '未配置')

    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: '服务器未配置 DEEPSEEK_API_KEY 环境变量' })
      }
    }

    // 测试API密钥 - 调用DeepSeek API的models端点
    const response = await fetch('https://api.deepseek.com/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    })

    const responseText = await response.text()
    console.log('API密钥测试响应:', {
      status: response.status,
      statusText: response.statusText,
      responseLength: responseText.length,
      responsePreview: responseText.substring(0, 200)
    })

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ 
          error: 'API密钥无效',
          details: responseText
        })
      }
    }

    const data = JSON.parse(responseText)
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'API密钥有效',
        models: data
      })
    }

  } catch (error) {
    console.error('API密钥测试错误:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'API密钥测试失败',
        message: error.message 
      })
    }
  }
}