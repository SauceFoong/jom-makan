export const emailTemplates = (template, payload) => {

    let today = new Date();
    const dateTime = today.getDate() + "/"
        + (today.getMonth() + 1) + "/"
        + today.getFullYear() + " "
        + today.getHours() + ":"
        + today.getMinutes()


    switch (template) {
        case 'jomOrder':
            //sample for testing
            return {
                subject: `A new jom added to your order by ${payload.jommer}`,
                body: `
                <p>Dear ${payload.orderer},</p>
                <p><strong>${payload.jommer}</strong> jom your order at <strong>${dateTime}</strong>.
                <br/>
                Click on the below button to view your order.
                </p>
                <br/><br/>
                <a style="padding:10px;color:#fff; background:#025B95; text-decoration:none; cursor:pointer;" href="https://jom-makan.vercel.app/order-details?id=${payload.orderId}">View Report</a>
                `
            }


        default:
            return {
                subject: '',
                body: ''
            }
    }
}