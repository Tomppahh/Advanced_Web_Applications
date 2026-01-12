const token = localStorage.getItem("token")

if (!token) {
    window.location.href = "/login.html"
} else {
    const logoutBtn = document.getElementById("logout")
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("token")
            window.location.href = "/login.html"
        })
    }
    checkAuth()
}

async function checkAuth() {
    try {
        const response = await fetch("/api/private", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if (response.ok) {
            const data = await response.json()
            document.getElementById("message").innerText = data.message
        } else {
            localStorage.removeItem("token")
            window.location.href = "/login.html"
        }
    } catch (error) {
        console.log(`Error: ${error.message}`)
        localStorage.removeItem("token")
        window.location.href = "/login.html"
    }
}
