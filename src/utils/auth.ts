/* auth验证方法 */

import jwt = require('jsonwebtoken')
import { Context } from 'koa'

import config = require('../config')

// 验证Auth
const authToken = (req: Context) => {
  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ')
    if (Object.is(parts.length, 2) && Object.is(parts[0], 'Bearer')) {
      return parts[1]
    }
  }
  return false
}

// 验证权限
const authIsVerified = (req: Context) => {
  const token = authToken(req)
  if (token) {
    try {
      const decodedToken = jwt.verify(token, config.AUTH.jwtTokenSecret)
      // @ts-ignore
      if (decodedToken.exp > Math.floor(Date.now() / 1000)) {
        return true
      }
    } catch (err) {
      console.log(err)
    }
  }
  return false
}

export default authIsVerified
