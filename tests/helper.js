const path = require('path');
<<<<<<< HEAD
const crypto = require('crypto');
const Client = require('../src/Client');
=======
const { Client, LegacySessionAuth, LocalAuth } = require('..');
>>>>>>> 6ab98a53658b5e918ad60cb4f12eb82ab15b838f

require('dotenv').config();

const remoteId = process.env.WWEBJS_TEST_REMOTE_ID;
if(!remoteId) throw new Error('The WWEBJS_TEST_REMOTE_ID environment variable has not been set.');

<<<<<<< HEAD
function isUsingDeprecatedSession() {
=======
function isUsingLegacySession() {
>>>>>>> 6ab98a53658b5e918ad60cb4f12eb82ab15b838f
    return Boolean(process.env.WWEBJS_TEST_SESSION || process.env.WWEBJS_TEST_SESSION_PATH);
}

function isMD() {
    return Boolean(process.env.WWEBJS_TEST_MD);
}

<<<<<<< HEAD
if(isUsingDeprecatedSession() && isMD()) throw 'Cannot use deprecated sessions with WWEBJS_TEST_MD=true';

function getSessionFromEnv() {
    if (!isUsingDeprecatedSession()) return null;
=======
if(isUsingLegacySession() && isMD()) throw 'Cannot use legacy sessions with WWEBJS_TEST_MD=true';

function getSessionFromEnv() {
    if (!isUsingLegacySession()) return null;
>>>>>>> 6ab98a53658b5e918ad60cb4f12eb82ab15b838f

    const envSession = process.env.WWEBJS_TEST_SESSION;
    if(envSession) return JSON.parse(envSession);

    const envSessionPath = process.env.WWEBJS_TEST_SESSION_PATH;
    if(envSessionPath) {
        const absPath = path.resolve(process.cwd(), envSessionPath);
        return require(absPath);
    }
}

function createClient({authenticated, options: additionalOpts}={}) {
    const options = {};

    if(authenticated) {
<<<<<<< HEAD
        const deprecatedSession = getSessionFromEnv();
        if(deprecatedSession) {
            options.session = deprecatedSession;
            options.useDeprecatedSessionAuth = true;
        } else {
            const clientId = process.env.WWEBJS_TEST_CLIENT_ID;
            if(!clientId) throw new Error('No session found in environment.');
            options.clientId = clientId;
        }
    } else {
        options.clientId = crypto.randomBytes(5).toString('hex');
=======
        const legacySession = getSessionFromEnv();
        if(legacySession) {
            options.authStrategy = new LegacySessionAuth({
                session: legacySession
            });
        } else {
            const clientId = process.env.WWEBJS_TEST_CLIENT_ID;
            if(!clientId) throw new Error('No session found in environment.');
            options.authStrategy = new LocalAuth({
                clientId
            });
        }
>>>>>>> 6ab98a53658b5e918ad60cb4f12eb82ab15b838f
    }

    const allOpts = {...options, ...(additionalOpts || {})};
    return new Client(allOpts);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    sleep, 
    createClient,
<<<<<<< HEAD
    isUsingDeprecatedSession,
=======
    isUsingLegacySession,
>>>>>>> 6ab98a53658b5e918ad60cb4f12eb82ab15b838f
    isMD,
    remoteId,
};