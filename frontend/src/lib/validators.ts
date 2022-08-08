import { type Schema, type SchemaDraft, Validator } from '@cfworker/json-schema';

const shortCircuit = false;
const draft: SchemaDraft = '2020-12';

const accCreateSchema: Schema = {
	$schema: 'https://json-schema.org/draft/2020-12/schema',
	title: 'AccountCreate',
	type: 'object',
	required: ['phash', 'email'],
	properties: {
		phash: { type: 'string', description: 'Cryptographic hash of password.' },
		email: { type: 'string', format: 'email', description: 'Email of account user.' },
		fname: { type: 'string', description: 'First name of account user.' },
		lname: { type: 'string', description: 'Last name of account user.' },
		title: { type: 'string', description: 'Title of account user.' },
		permission: {
			$ref: '#/$defs/permissions'
		}
	},
	$defs: {
		permissions: {
			type: 'string',
			oneOf: [
				{
					pattern: 'admin'
				},
				{
					pattern: 'read'
				},
				{
					pattern: 'owner'
				}
			]
		}
	}
};

const accUpdateSchema: Schema = {
	$schema: 'https://json-schema.org/draft/2020-12/schema',
	title: 'AccountUpdate',
	type: 'object',
	properties: {
		phash: { type: 'string', description: 'Cryptographic hash of password.' },
		email: { type: 'string', format: 'email', description: 'Email of account user.' },
		fname: { type: 'string', description: 'First name of account user.' },
		lname: { type: 'string', description: 'Last name of account user.' },
		title: { type: 'string', description: 'Title of account user.' },
		permission: {
			$ref: '#/$defs/permissions'
		}
	},
	$defs: {
		permissions: {
			type: 'string',
			oneOf: [
				{
					pattern: 'admin'
				},
				{
					pattern: 'read'
				},
				{
					pattern: 'owner'
				}
			]
		}
	}
};

const nodeCreateSchema: Schema = {
	$schema: 'https://json-schema.org/draft/2020-12/schema',
	title: 'AccountCreate',
	type: 'object',
	required: ['name', 'fqdn'],
	properties: {
		name: { type: 'string', description: 'Cryptographic hash of password.' },
		fqdn: { type: 'string', description: 'Email of account user.' }
	}
};

export const accCreateValidator = new Validator(accCreateSchema, draft, shortCircuit);
export const accUpdateValidator = new Validator(accUpdateSchema, draft, shortCircuit);
export const nodeCreateValidator = new Validator(nodeCreateSchema, draft, shortCircuit);
