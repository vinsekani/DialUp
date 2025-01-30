const mpesaAccessToken = async () => {
  const consumerKey = "wHPXI2maqpbWI9GiesGAxlnYtoqL2G7erI0TcPOC99lp6zuA";
  const consumerSecret =
    "02DMAaC0xamvNQpQbChAF102z8g54zx8ukHMtRYynWdCAK4ZYSx85DXYN52kHd89";

  const base64String = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  );
  const url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const headers = new Headers();
  headers.set("Authorization", `Basic ${base64String}`);

  const response = await fetch(url, { headers });
  const data = await response.json();
  const token = data;
  return token;

};


module.exports = { mpesaAccessToken };
