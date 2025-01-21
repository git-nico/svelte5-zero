<script lang="ts">
	import { base } from '$app/paths';

	// @ts-ignore No types available
	import QrCode from 'qrcodejs';

	let input_text = $state('hello');

	let matrix = $derived(QrCode.generate(input_text));
	let uri = $derived(QrCode.render('svg-uri', matrix));
</script>

<input type="text" bind:value={input_text} />

<img class="size-64" src={uri} alt="generated qrcode" />

<p>Generate: <a class="text-blue-500 font-semibold underline" href="{base}/qr/{input_text}.svg" target="_blank" aria-label="Generate SVG">{input_text}.svg</a></p>
