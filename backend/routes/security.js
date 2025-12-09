import express from "express";
import fetch from "node-fetch";
import User from "../models/user.model.js";
import authCheck from "../middleware/authCheck.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/discord/login", authCheck, (req, res) => {
  const redirect = process.env.DISCORD_REDIRECT_URI;
  const client_id = process.env.DISCORD_CLIENT_ID;
  res.redirect(
    `https://discord.com/oauth2/authorize?client_id=${client_id}&response_type=code&scope=identify&redirect_uri=${redirect}`
  );
});

router.get("/discord/callback", async (req, res) => {
  const { code, state } = req.query;

  if (!code) return res.send("Discord Authorization Failed ❌");

  const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.DISCORD_REDIRECT_URI,
      scope: "identify",
    }),
  });

  const tokenData = await tokenResponse.json();

  if (!tokenData.access_token) {
    return res.send("Discord Authorization Failed ❌");
  }

  // Fetch Discord User
  const userResponse = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
  });

  const discordUser = await userResponse.json();
  if (!discordUser.id) return res.send("Failed to fetch Discord user");

  // Get Panel User from JWT Saved in state cookie?
  // For now we skip state and use forced login route
  // FUTURE: Use JWT signed redirect

  const panelToken = req.cookies ? req.cookies.glom_token : null;
  const decoded = panelToken
    ? jwt.verify(panelToken, process.env.JWT_SECRET)
    : null;

  if (!decoded) {
    return res.send("You must login panel first!");
  }

  const panelUser = await User.findById(decoded.userId);
  if (!panelUser) return res.send("Account not found");

  // If the account already has discord linked and different id
  if (panelUser.discordId && panelUser.discordId !== discordUser.id) {
    return res.send("This Discord account is linked with another GLOM user ❌");
  }

  // Save Discord ID
  panelUser.discordId = discordUser.id;
  await panelUser.save();

  return res.send("🎉 Discord Linked Successfully — You can close this page!");
});

export default router;
