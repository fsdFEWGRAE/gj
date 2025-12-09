  const redirect =>
  res.json({ url: redirect });
});

router.get("/callback", async (req, res) =
  const code = req.query.code;
  if (!code) return error(res, "Missing discord code");
  try {
    const tokenData = await axios.post("https://discord.com/api/oauth2/token", new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.DISCORD_REDIRECT_URI
    }), { headers: { "Content-Type": "application/x-www-form-urlencoded" }});

    const userData = await axios.get("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokenData.data.access_token}` }
    });

    success(res, userData.data);
  } catch (err) {
    console.log(err.response?.data);
    error(res, "Discord link failed");
  }
});

export default router;
