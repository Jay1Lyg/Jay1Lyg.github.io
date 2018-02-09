/*
*
*
*
*        消息的加解密算法（aes加解密）
*
*
*/
var keystone = require('keystone');
var fs = require('fs');
var crypto = require('crypto');
/*首先对EncodingAESKey进行base64位解码得到aes_key,通过aes_key得到向量iv*/
var EncodingAESKey = (JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/GetEncodingAESKey.json', 'utf-8')))[0].EncodingAESKey;
var aes_key = new Buffer(EncodingAESKey+'=', 'base64');
var iv = aes_key.slice(0, 16);
var info = (JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/WX_ServerrNO_info.json', 'utf-8')))[0];



function PKCS7Decoder(buff) {
    var pad = buff[buff.length - 1];
    if (pad < 1 || pad > 32) {
        pad = 0;
    }
    return buff.slice(0, buff.length - pad);
}
function PKCS7Encoder(buff) {
    var blockSize = 32;
    var strSize = buff.length;
    var amountToPad = blockSize - (strSize % blockSize);
    var pad = new Buffer(amountToPad-1);
    pad.fill(String.fromCharCode(amountToPad));
    return Buffer.concat([buff, pad]);
}
function KCS7Encoder (text_length){
    var block_size = 32
    // 计算需要填充的位数
    var amount_to_pad = block_size - (text_length % block_size);
    if (amount_to_pad === 0) 
    {
        amount_to_pad = block_size;
    }
    // 获得补位所用的字符
    var pad = String.fromCharCode(amount_to_pad), s = [];
    for (var i=0; i<amount_to_pad; i++) s.push(pad);
    return s.join('');
}
//aes加密
function encrypt (xmlMsg, appID, callback) {
    // var random16 = crypto.pseudoRandomBytes(16);
    // var msg = new Buffer(xmlMsg);
    // var msgLength = new Buffer(4);
    // msgLength.writeUInt32BE(msg.length, 0);
    // var corpId = new Buffer(appID);
    // var raw_msg = Buffer.concat([random16, msgLength, msg, corpId]);//randomString + msgLength + xmlMsg + this.corpID;
    // //var encoded = PKCS7Encoder(raw_msg);
    // var cipher = crypto.createCipheriv('aes-256-cbc', aes_key, iv);
    // //cipher.setAutoPadding(false);
    // var cipheredMsg = Buffer.concat([cipher.update(/*encoded*/raw_msg), cipher.final()]);
    // callback(null, cipheredMsg.toString('base64')) ;



     //声明 16位的随机字符串
    var random =crypto.randomBytes(8).toString('hex');
    var text = new Buffer(xmlMsg);
    var buf = new Buffer(4);
    buf.writeUInt32BE(text.length);
    //进行PKCS7补位
    var pack = KCS7Encoder(20 + text.length + appID.length);
    //拼接要加密的字符串
    var content = random + buf.toString('binary') + text.toString('binary') + appID + pack;
    //实例 AES 加密对象
    var cipheriv = crypto.createCipheriv('aes-256-cbc', aes_key, iv);
    //设置自定填充数据为 false
    cipheriv.setAutoPadding(false);
    //对明文加密
    var encryptedMsg = Buffer.concat([cipheriv.update(content,'binary'),cipheriv.final()]).toString('base64');
    callback(null, encryptedMsg);
};

//aes解密
function decrypt (str, corp_ID, callback) {
    var aesCipher = crypto.createDecipheriv("aes-256-cbc", aes_key, iv);
    aesCipher.setAutoPadding(false);
    var decipheredBuff = Buffer.concat([aesCipher.update(str, 'base64'), aesCipher.final()]);
    decipheredBuff = PKCS7Decoder(decipheredBuff);
    var len_netOrder_corpid = decipheredBuff.slice(16);
    var msg_len = len_netOrder_corpid.slice(0, 4).readUInt32BE(0);
    //recoverNetworkBytesOrder(len_netOrder_corpid.slice(0, 4));
    var result = len_netOrder_corpid.slice(4, msg_len + 4).toString();
    var corpID = len_netOrder_corpid.slice(msg_len + 4).toString();
    console.log('corpID:'+corpID);
    console.log('corp_ID:'+corp_ID);
    //对appId的验证
    if (corpID != corp_ID)throw new Error('corpID is invalid');
    callback(null, result);
};



module.exports = {
	encrypt: encrypt,
	decrypt: decrypt
}