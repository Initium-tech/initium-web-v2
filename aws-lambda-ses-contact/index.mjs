import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: "us-east-1" });

export const handler = async (event) => {
    // Enable CORS
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const body = JSON.parse(event.body);
        const { name, email, message, recaptchaToken } = body;

        // OPTIONAL: Verify recaptchaToken with Google here before sending email
        // const recaptchaSecret = "YOUR_SECRET_KEY";
        // const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`;

        // USE A VERIFIED SES EMAIL - 'info@initiumtec.com' is not verified yet, using 'rgarcia@initiumtec.com'
        const params = {
            Source: "rgarcia@initiumtec.com",
            Destination: {
                ToAddresses: ["rgarcia@initiumtec.com"],
            },
            Message: {
                Subject: { Data: `Nuevo mensaje de contacto web de ${name}` },
                Body: {
                    Text: {
                        Data: `Has recibido un nuevo mensaje desde el portal de Initium Tech.\n\nNombre: ${name}\nCorreo: ${email}\nMensaje:\n${message}`
                    }
                }
            }
        };

        const command = new SendEmailCommand(params);
        await ses.send(command);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: "Email sent successfully" }),
        };
    } catch (error) {
        console.error("Error sending email:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: "Failed to send email", error: error.message }),
        };
    }
};
