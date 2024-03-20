import { redirectToAuthCodeFlow, getAccessToken } from "./authCodeWithPkce";

const clientId = "7ba415376b6e47a3b71228caca13cc9a";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    getAccessToken(clientId, code)
        .then(async (accessToken) => {
            const profile = await fetchProfile(accessToken);
            populateUI(profile);
        })
        .catch(error => console.error("Error getting access token:", error));
}

async function fetchProfile(code) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${code}` }
    });

    return await result.json();
}

function populateUI(profile) {
    document.getElementById("displayName").innerText = profile.display_name;
    document.getElementById("avatar").setAttribute("src", profile.images[0].url);
    document.getElementById("id").innerText = profile.id;
    document.getElementById("email").innerText = profile.email;
    document.getElementById("uri").innerText = profile.uri;
    document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
    document.getElementById("url").innerText = profile.href;
    document.getElementById("url").setAttribute("href", profile.href);
    document.getElementById("imgUrl").innerText = profile.images[0].url;
}