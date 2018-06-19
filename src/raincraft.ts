const host = 'http://cone.jondgoodwin.com';

interface Server {
    name: string;
    endpoints: {
        minecraft: string;
        rcon: string;
    }
}

// let serverList = [{"name":"BlockRaiders","endpoints":{"minecraft":"124.0.35.12:25565","rcon":"124.0.35.12:25575"}},{"name":"Kubenaughts","endpoints":{"minecraft":"124.0.35.12:25566","rcon":"124.0.35.12:25576"}}];
const servers = document.getElementById('servers');
const addServerName = document.getElementById('addServerName') as HTMLInputElement;
const addServerButton = document.getElementById('addServerButton') as HTMLButtonElement;
const error = document.getElementById('error') as HTMLParagraphElement;

const listServers = (
    admin: boolean,
) => {
    fetch(`${host}/servers`)
        .then(r => r.json())
    // Promise.resolve([{"name":"BlockRaiders","endpoints":{"minecraft":"124.0.35.12:25565","rcon":"124.0.35.12:25575"}},{"name":"Kubenaughts","endpoints":{"minecraft":"124.0.35.12:25566","rcon":"124.0.35.12:25576"}}])
        .then((serverList: Server[]) => {
            servers!.innerHTML = '<tr><th>Name</th><th>Minecraft</th><th>Rcon</th><th></th></tr>';

            for (let server of serverList) {
                console.log(server);
                const tr = document.createElement('tr') as HTMLTableRowElement;
                tr.innerHTML = `<td>${server.name}</td><td>${server.endpoints.minecraft}</td><td>${server.endpoints.rcon}</td>`
                    + (admin ? `<td><button onclick="deleteServer('${server.name}')">X</td>` : '');
                servers!.appendChild(tr);
                }
        });
}

function addServer() {
    const name = addServerName.value;
    fetch(`${host}/servers/${name}`, {
        method: 'POST',
    }).then(response => {
        if (response.status === 201) {
            error.innerText = "added!";
            listServers(true);
        } else
            error.innerText = "failed to add";
    });
};

const deleteServer = (
    name: string,
) => {
    fetch(`${host}/servers/${name}`, {
        method: 'DELETE',
    }).then(response => {
        if (response.status === 204) {
            error.innerText = "deleted!";
            listServers(true);
        } else
            error.innerText = "failed to delete";
    });
}