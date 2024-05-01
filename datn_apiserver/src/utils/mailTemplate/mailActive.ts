export const mailActive = (name: String, key: string) => {
    return `
        <h2>Hello ${name}</h2> 
        <p>Thank you for joining [customer portal].</p>
        <p>We’d like to confirm that your account was created successfully. To access App use key active : </p>
        <h1 style="text-align: center;">${key}</h1>
        <p>If you experience any issues logging into your account, reach out to us.</p>
        <p>Best,</p>
        <p>Thank</p>
        `;
};
