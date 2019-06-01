<script>
	import { auth } from '../library/stores.js';
	import { goto, stores } from '@sapper/app';
	
	const { session } = stores();

	auth.logout();
	$session.user = null;
	goto('/login');
	
</script>