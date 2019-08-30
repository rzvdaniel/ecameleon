<script>
	import { goto, stores } from '@sapper/app';
	import { auth } from '../library/auth.js';

	const { session } = stores();

	// 1. Delete user infomation from client
	$session.user = null;

	// 2. Logout from server
	// Because we can’t use await outside of an async function, 
	// we have to use the Promise API directly
	auth.logout()
		.then(result => {
			goto('/login'); 
		})
	
</script>