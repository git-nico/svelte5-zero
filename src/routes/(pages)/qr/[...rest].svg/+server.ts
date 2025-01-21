// @ts-ignore No types available
import QrCode from 'qrcodejs';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, setHeaders }) => {
	const input_text = params.rest;

	console.log('input_text', input_text);

	const matrix = QrCode.generate(input_text);

	const svg = QrCode.render('svg', matrix);

	console.log('Matrix:');
	console.dir(matrix);

	setHeaders({ 'Content-Type': 'image/svg+xml' });
	return new Response(svg);
};
