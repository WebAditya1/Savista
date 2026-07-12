const brandColor = '#004088';
const accentColor = '#0898a0';

function baseTemplate(title: string, content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f4f7fa;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fa;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(11,61,92,0.1);">
          <tr>
            <td style="background:linear-gradient(135deg,${brandColor},${accentColor});padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:600;letter-spacing:1px;">Savista</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:13px;">Precision uPVC Solutions</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="background:#f8fafc;padding:24px 40px;text-align:center;border-top:1px solid #e8edf2;">
              <p style="margin:0;color:#64748b;font-size:12px;">© ${new Date().getFullYear()} Savista. All rights reserved.</p>
              <p style="margin:8px 0 0;color:#94a3b8;font-size:11px;">Plot 42, Industrial Estate, Sector 18, Gurugram</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 0;color:#64748b;font-size:14px;width:140px;vertical-align:top;">${label}</td>
    <td style="padding:8px 0;color:#1e293b;font-size:14px;font-weight:500;">${value}</td>
  </tr>`;
}

export function contactAdminEmail(data: {
  name: string;
  phone: string;
  email: string;
  city: string;
  requirement: string;
  message: string;
}): string {
  const content = `
    <h2 style="margin:0 0 24px;color:${brandColor};font-size:20px;">New Contact Inquiry</h2>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${row('Name', data.name)}
      ${row('Phone', data.phone)}
      ${row('Email', data.email)}
      ${row('City', data.city)}
      ${row('Requirement', data.requirement)}
      ${row('Message', data.message)}
    </table>
    <div style="margin-top:24px;padding:16px;background:#f0f9ff;border-radius:8px;border-left:4px solid ${accentColor};">
      <p style="margin:0;color:#0369a1;font-size:13px;">Please respond within 24 hours for best conversion.</p>
    </div>`;
  return baseTemplate('New Contact Inquiry', content);
}

export function contactAckEmail(name: string): string {
  const content = `
    <h2 style="margin:0 0 16px;color:${brandColor};font-size:22px;">Thank You, ${name}!</h2>
    <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.6;">
      We've received your inquiry and our team will get back to you within 24 hours.
    </p>
    <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.6;">
      In the meantime, explore our premium UPVC doors and windows collection on our website.
    </p>
    <a href="${process.env.FRONTEND_URL || 'https://savista.in'}" 
       style="display:inline-block;background:linear-gradient(135deg,${brandColor},${accentColor});color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
      Visit Our Website
    </a>`;
  return baseTemplate('Thank You for Contacting Us', content);
}

export function orderAdminEmail(data: {
  name: string;
  phone: string;
  email: string;
  city: string;
  items: { productName: string; quantity: number; width?: string; height?: string; requirements?: string }[];
  additionalNotes?: string;
}): string {
  const itemsHtml = data.items
    .map(
      (item, i) => `
    <tr style="background:${i % 2 === 0 ? '#f8fafc' : '#ffffff'};">
      <td style="padding:12px;color:#1e293b;font-size:13px;">${item.productName}</td>
      <td style="padding:12px;color:#1e293b;font-size:13px;">${item.quantity}</td>
      <td style="padding:12px;color:#1e293b;font-size:13px;">${item.width || '—'} × ${item.height || '—'}</td>
      <td style="padding:12px;color:#1e293b;font-size:13px;">${item.requirements || '—'}</td>
    </tr>`
    )
    .join('');

  const content = `
    <h2 style="margin:0 0 8px;color:${brandColor};font-size:20px;">New Order Inquiry</h2>
    <p style="margin:0 0 24px;color:#64748b;font-size:14px;">A customer has submitted a product inquiry.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${row('Name', data.name)}
      ${row('Phone', data.phone)}
      ${row('Email', data.email)}
      ${row('City', data.city)}
      ${data.additionalNotes ? row('Notes', data.additionalNotes) : ''}
    </table>
    <h3 style="margin:0 0 12px;color:${brandColor};font-size:16px;">Products Requested</h3>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
      <tr style="background:${brandColor};">
        <th style="padding:12px;color:#fff;font-size:12px;text-align:left;">Product</th>
        <th style="padding:12px;color:#fff;font-size:12px;text-align:left;">Qty</th>
        <th style="padding:12px;color:#fff;font-size:12px;text-align:left;">Dimensions</th>
        <th style="padding:12px;color:#fff;font-size:12px;text-align:left;">Requirements</th>
      </tr>
      ${itemsHtml}
    </table>`;
  return baseTemplate('New Order Inquiry', content);
}

export function orderAckEmail(name: string, itemCount: number): string {
  const content = `
    <h2 style="margin:0 0 16px;color:${brandColor};font-size:22px;">Inquiry Received!</h2>
    <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.6;">
      Dear ${name}, thank you for your interest in Savista uPVC products.
    </p>
    <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.6;">
      We've received your inquiry for <strong style="color:${accentColor};">${itemCount} product(s)</strong>. 
      Our sales team will prepare a customized quote and contact you shortly.
    </p>
    <div style="margin:24px 0;padding:20px;background:linear-gradient(135deg,#f0f9ff,#e0f2fe);border-radius:8px;">
      <p style="margin:0;color:#0369a1;font-size:14px;font-weight:600;">What happens next?</p>
      <ol style="margin:12px 0 0;padding-left:20px;color:#475569;font-size:14px;line-height:1.8;">
        <li>Our team reviews your requirements</li>
        <li>We schedule a site visit if needed</li>
        <li>You receive a detailed quotation</li>
      </ol>
    </div>`;
  return baseTemplate('Order Inquiry Confirmation', content);
}
