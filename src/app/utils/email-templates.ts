import { PlanEnum } from './enums';

export const registrationEmailTemplate = (username: string): string => `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <html lang="en">
      <head></head>
      <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">The universal hub for AI generations.<div></div>
      </div>
      <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
        <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
          <tr style="width:100%">
            <td><img alt="Koala" src="https://i.ibb.co/3RkbRCD/logo-blue.png" width="100" height="100" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" />
              <p style="font-size:16px;line-height:26px;margin:16px 0">Hi ${username},</p>
              <p style="font-size:16px;line-height:26px;margin:16px 0">Welcome to Brain Stack, the universal Hub for AI generations. You can try it for free right now!</p>
                <table style="text-align:center" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td><a href="https://brain-stack.com/saas-product" target="_blank" style="background-color:#389ABB;border-radius:3px;color:#fff;font-size:16px;text-decoration:none;text-align:center;display:inline-block;p-x:12px;p-y:12px;line-height:100%;max-width:100%;padding:12px 12px"><span><!--[if mso]><i style="letter-spacing: 12px;mso-font-width:-100%;mso-text-raise:18" hidden>&nbsp;</i><![endif]--></span><span style="background-color:#389ABB;border-radius:3px;color:#fff;font-size:16px;text-decoration:none;text-align:center;display:inline-block;p-x:12px;p-y:12px;max-width:100%;line-height:120%;text-transform:none;mso-padding-alt:0px;mso-text-raise:9px">Get started</span><span><!--[if mso]><i style="letter-spacing: 12px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td>
                    </tr>
                  </tbody>
                </table>
              <p style="font-size:16px;line-height:26px;margin:16px 0">Best,<br />The Brain Stack team</p>
              <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
            </td>
          </tr>
        </table>
      </body>
    </html>
`;

export const subscriptionEmailTemplate = (username: string, plan: PlanEnum): string => `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
  <html lang="en">
    <head></head>
    <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Brain Stack recent subscription<div></div>
    </div>
    <body style="background-color:#fff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
      <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em">
        <tr style="width:100%">
          <td>
            <table style="padding:30px 20px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
              <tbody>
                <tr>
                  <td><img src="https://i.ibb.co/3RkbRCD/logo-blue.png" width="50px" height="50px" style="display:block;outline:none;border:none;text-decoration:none" /></td>
                </tr>
              </tbody>
            </table>
            <table style="border:1px solid rgb(0,0,0, 0.1);border-radius:3px;overflow:hidden" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
              <tbody>
                <tr>
                  <td><img src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/yelp-header.png" width="620" style="display:block;outline:none;border:none;text-decoration:none" />
                    <table width="100%" style="padding:20px 40px;padding-bottom:0" align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td>
                            <h1 style="font-size:32px;font-weight:bold;text-align:center">Hi ${username},</h1>
                            <h2 style="font-size:26px;font-weight:bold;text-align:center">Thank you for subscribing to the ${plan} plan!</h2>
                            <p style="font-size:16px;line-height:24px;margin:16px 0">You can try all of our tools in our dashboard.</p>
                            <p style="font-size:16px;line-height:24px;margin:16px 0;margin-top:-5px">Hope you have a nice experience using the hub!</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table width="100%" style="padding:20px 40px;padding-top:0" align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                      <tbody style="width:100%">
                        <tr style="width:100%;display:flex;align-items:center;justify-content:center">
                          <td colSpan="2" style="display:flex;justify-content:center;width:100%"><a target="_blank" style="background-color:#389ABB;padding:0px 0px;border-radius:3px;color:#FFF;font-weight:bold;border:1px solid rgb(0,0,0, 0.1);cursor:pointer;line-height:100%;text-decoration:none;display:inline-block;max-width:100%"><span><!--[if mso]><i style="letter-spacing: undefinedpx;mso-font-width:-100%;mso-text-raise:0" hidden>&nbsp;</i><![endif]--></span><span style="background-color:#389ABB;padding:12px 30px;border-radius:3px;color:#FFF;font-weight:bold;border:1px solid rgb(0,0,0, 0.1);cursor:pointer;max-width:100%;display:inline-block;line-height:120%;text-decoration:none;text-transform:none;mso-padding-alt:0px;mso-text-raise:0">Explore the dashboard</span><span><!--[if mso]><i style="letter-spacing: undefinedpx;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;

export const subscriptionUpdatedEmailTemplate = (username: string, plan: PlanEnum): string => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
  <html lang="en">
    <head></head>
    <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Brain Stack recent subscription update<div></div>
    </div>
    <body style="background-color:#fff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
      <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em">
        <tr style="width:100%">
          <td>
            <table style="padding:30px 20px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
              <tbody>
                <tr>
                  <td><img src="https://i.ibb.co/3RkbRCD/logo-blue.png" width="50px" height="50px" style="display:block;outline:none;border:none;text-decoration:none" /></td>
                </tr>
              </tbody>
            </table>
            <table style="border:1px solid rgb(0,0,0, 0.1);border-radius:3px;overflow:hidden" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
              <tbody>
                <tr>
                  <td><img src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/yelp-header.png" width="620" style="display:block;outline:none;border:none;text-decoration:none" />
                    <table width="100%" style="padding:20px 40px;padding-bottom:0" align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td>
                            <h1 style="font-size:32px;font-weight:bold;text-align:center">Hi ${username},</h1>
                            <h2 style="font-size:26px;font-weight:bold;text-align:center">Your subscription plan has been updated to the ${plan} plan!</h2>
                            <p style="font-size:16px;line-height:24px;margin:16px 0">Your new plan will be active on the next billing cycle. Enjoy your new features.</p>
                            <p style="font-size:16px;line-height:24px;margin:16px 0">You can try all of our tools in our dashboard.</p>
                            <p style="font-size:16px;line-height:24px;margin:16px 0;margin-top:-5px">Hope you have a nice experience using the hub!</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table width="100%" style="padding:20px 40px;padding-top:0" align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                      <tbody style="width:100%">
                        <tr style="width:100%;display:flex;align-items:center;justify-content:center">
                          <td colSpan="2" style="display:flex;justify-content:center;width:100%"><a target="_blank" style="background-color:#389ABB;padding:0px 0px;border-radius:3px;color:#FFF;font-weight:bold;border:1px solid rgb(0,0,0, 0.1);cursor:pointer;line-height:100%;text-decoration:none;display:inline-block;max-width:100%"><span><!--[if mso]><i style="letter-spacing: undefinedpx;mso-font-width:-100%;mso-text-raise:0" hidden>&nbsp;</i><![endif]--></span><span style="background-color:#389ABB;padding:12px 30px;border-radius:3px;color:#FFF;font-weight:bold;border:1px solid rgb(0,0,0, 0.1);cursor:pointer;max-width:100%;display:inline-block;line-height:120%;text-decoration:none;text-transform:none;mso-padding-alt:0px;mso-text-raise:0">Explore the dashboard</span><span><!--[if mso]><i style="letter-spacing: undefinedpx;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
