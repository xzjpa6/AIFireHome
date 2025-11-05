import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 创建自定义插件来处理API请求
const apiPlugin = () => ({
  name: 'api-handler',
  configureServer(server) {
    server.middlewares.use('/api/chat-completions', async (req, res) => {
      // 处理OPTIONS预检请求
      if (req.method === 'OPTIONS') {
        res.statusCode = 200
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
        res.end('')
        return
      }

      // 只处理POST请求
      if (req.method !== 'POST') {
        res.statusCode = 405
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Method not allowed' }))
        return
      }

      try {
        // 读取请求体
        let body = ''
        req.on('data', chunk => {
          body += chunk.toString()
        })
        
        req.on('end', async () => {
          try {
            const requestBody = JSON.parse(body)
            const apiKey = process.env.DEEPSEEK_API_KEY

            if (!apiKey) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: '服务器未配置 DEEPSEEK_API_KEY 环境变量' }))
              return
            }

            // 转发到DeepSeek API
            const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
              },
              body: JSON.stringify(requestBody)
            })

            const responseText = await response.text()
            
            // 设置响应头
            res.statusCode = response.status
            res.setHeader('Content-Type', 'application/json')
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
            res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
            
            res.end(responseText)
          } catch (error) {
            console.error('代理函数错误:', error)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ 
              error: '代理函数错误',
              message: error.message 
            }))
          }
        })
      } catch (error) {
        console.error('处理请求错误:', error)
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ 
          error: '处理请求错误',
          message: error.message 
        }))
      }
    })
  }
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), apiPlugin()]
})