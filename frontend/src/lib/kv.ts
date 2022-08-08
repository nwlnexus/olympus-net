// /* eslint-disable @typescript-eslint/no-non-null-assertion */
// import { bindings } from '$utils';
// // import { isAccountStatus } from '$utils';

// const { KVHELIOS } = bindings();

// export async function findAccountByEmail(val: string): Promise<Account[]> {
// 	const values = (await retrieveAll('accounts')) as Account[];
// 	return values.filter((e: Account) => {
// 		if (e.email === val) {
// 			return e;
// 		}
// 	});
// }

// export async function findAccountByStatus(val: AccountStatus): Promise<Account[]> {
// 	const values = (await retrieveAll('accounts')) as Account[];
// 	return values.filter((e: Account) => {
// 		if (e.status === val) {
// 			return e;
// 		}
// 	});
// }
