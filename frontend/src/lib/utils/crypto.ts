import CryptoJS from 'crypto-js';

// const keyLengthHint = (algo: string): number => {
// 	switch (algo) {
// 		case 'aes-512-gcm':
// 			return 16;
// 		case 'aes-256-gcm':
// 			return 8;
// 		case 'aes-192-gcm':
// 			return 6;
// 		case 'aes-128-gcm':
// 			return 4;
// 		default:
// 			throw new Error(`Unsupported algorithm ${algo}`);
// 	}
// };

export function encrypt(encryptionKey: string): (text: string) => string {
	// const encryptionOptions = {
	//   algorithm: 'aes-256-gcm',
	//   ivLength: 12,
	//   saltLength: 32,
	//   iterations: 1
	// } as const;
	return (text) => {
		const cipherParams = CryptoJS.AES.encrypt(text, encryptionKey);
		return `${cipherParams}`;
	};
}

export function decrypt(encryptionKey: string): (encrypted_string: string) => string {
	// const encryptionOptions = {
	//   algorithm: 'aes-256-gcm',
	//   ivLength: 12,
	//   saltLength: 32,
	//   iterations: 1
	// } as const;
	return (encrypted_string) => {
		// data is packed in this sequence [salt iv cipherText]
		// const cipherStartIndex = encryptionOptions.saltLength + encryptionOptions.ivLength;
		// const salt = buffer.words.slice(0, encryptionOptions.saltLength);
		// const iv = buffer.words.slice(encryptionOptions.saltLength, cipherStartIndex);
		// const cipherText = buffer.words.slice(cipherStartIndex);
		// const key = CryptoJS.PBKDF2(
		//   encryptionKey,
		//   salt.toString(),
		//   {
		//     keySize: keyLengthHint(encryptionOptions.algorithm),
		//     iterations: encryptionOptions.iterations
		//   }
		// );
		const decipher = CryptoJS.AES.decrypt(encrypted_string, encryptionKey);
		return CryptoJS.enc.Utf8.stringify(decipher);
	};
}
