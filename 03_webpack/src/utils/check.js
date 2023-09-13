// 封装验证手机号和验证码长度的函数
export const checkPhone = (phone) => phone.length === 11;
export const checkCode = (code) => code.length === 6;
