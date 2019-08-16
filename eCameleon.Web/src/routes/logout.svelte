<script>
	import { goto, stores } from '@sapper/app';
	
	const { session } = stores();
	// TODO! Logout from server too!
	$session.user = null;
	goto('/login');
	
</script>