
<template>
    <div>
        <nav>
            <router-link to="/tickets">Liste des tickets</router-link>
            <router-link to="/tickets/nouveau">Nouveau ticket</router-link>
        </nav>

        <router-view />
    </div>
</template>

<style>
body {
    background-color: #D9C3A3;
    margin: 0;
    font-family: Arial, sans-serif;
}

nav {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 20px;
}

nav a {
    text-decoration: none;
    color: white;
    background-color: #243b55;
    padding: 10px 18px;
    border-radius: 8px;
}

nav a:hover {
    background-color: #3b5878;
}
</style>
