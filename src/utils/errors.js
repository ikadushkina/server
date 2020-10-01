const errorList = {
    failedCheckLoginOrPassword:{
        status: 400,
        message: "failedCheckLoginOrPassword"
    }
}

const failedCheckLoginOrPassword = () => errorList.failedCheckLoginOrPassword

module.exports={
    failedCheckLoginOrPassword
}