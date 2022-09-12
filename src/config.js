let env = 'local'
// const apis='';
// const api=(!apis=='http://192.168.18.146:5000')?"Api is not called":alert("API ");
let config = {
    prod: {
        base_url: 'http://210.56.27.69:5000',
    },
    local: {
        base_url: 'http://localhost:5001',
    },
    office: {
        base_url: 'http://192.168.18.146:5001',
    },
}

if (env === 'prod') {
    config = config.prod
} else if (env === 'office') {
    config = config.office
} else if (env === 'local') {
    config = config.local
}

export default config
