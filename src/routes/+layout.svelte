<script lang="ts">
	import { base } from '$app/paths';
	import '../app.css';
	let { children } = $props();
</script>

<nav>
	<ul class="flex gap-x-8 mb-4 text-xl">
		<li class="hover:underline underline-offset-2">
			<a href={base}>Home</a>
		</li>
		<li class="hover:underline underline-offset-2">
			<a href="{base}/about">About</a>
		</li>
	</ul>
</nav>

{@render children()}
aap
