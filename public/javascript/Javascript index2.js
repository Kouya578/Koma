async function encryptText(text, password) {
    const enc = new TextEncoder();
    const encodedText = enc.encode(text);

    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        "PBKDF2",
        false,
        ["deriveKey"]
    );

    const key = await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: enc.encode("salt"),
            iterations: 100000,
            hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        key,
        encodedText
    );

    return {
        cipher: new Uint8Array(encrypted),
        iv: iv
    };
}

async function decryptText(cipher, iv, password) {
    const enc = new TextEncoder();

    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        "PBKDF2",
        false,
        ["deriveKey"]
    );

    const key = await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: enc.encode("salt"),
            iterations: 100000,
            hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );

    const decrypted = await crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        key,
        cipher
    );

    return new TextDecoder().decode(decrypted);
}

async function main() {
    // Get the value from the input field
    const textToEncrypt = document.getElementById('value1').value;
    const password = "your-password";
    
    // Encrypt the text
    const encryptedData = await encryptText(textToEncrypt, password);
    
    // Decrypt the text
    const decryptedData = await decryptText(encryptedData.cipher, encryptedData.iv, password);

    // Display the encrypted and decrypted results
    document.getElementById('encrypted2').innerText = 
        `Encrypted: ${Array.from(encryptedData.cipher).map(b => b.toString(16)).join('')}`;
    
    document.getElementById('decrypted2').innerText = 
        `Decrypted: ${decryptedData}`;
}
