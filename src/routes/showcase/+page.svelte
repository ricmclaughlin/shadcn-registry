<script lang="ts">
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/theme';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '$lib/components/ui/card';
	import { Input, Label } from '$lib/components/ui/input';

	let currentTheme = 'modern-minimal';
	let loading = false;

	// Available themes for quick switching
	const themes = [
		'modern-minimal',
		'violet-bloom', 
		'twitter',
		'bubblegum',
		'catppuccin',
		'graphite',
		'cyberpunk',
		'nature'
	];

	onMount(() => {
		themeStore.subscribe(theme => {
			currentTheme = theme;
		});
	});

	function switchTheme(theme: string) {
		themeStore.set(theme);
	}

	function simulateLoading() {
		loading = true;
		setTimeout(() => {
			loading = false;
		}, 2000);
	}
</script>

<svelte:head>
	<title>Component Showcase - shadcn-svelte Registry</title>
	<meta name="description" content="Showcase of Button, Card, and Input components across different themes" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="mb-8">
		<h1 class="text-4xl font-bold mb-4">Component Showcase</h1>
		<p class="text-lg text-muted-foreground mb-6">
			Explore our Tier 1 foundation components: Button, Card, and Input across different themes.
		</p>
		
		<!-- Theme Switcher -->
		<div class="mb-8">
			<h2 class="text-xl font-semibold mb-4">Current Theme: <span class="text-primary">{currentTheme}</span></h2>
			<div class="flex flex-wrap gap-2">
				{#each themes as theme}
					<Button 
						variant={currentTheme === theme ? 'default' : 'outline'}
						size="sm"
						on:click={() => switchTheme(theme)}
					>
						{theme}
					</Button>
				{/each}
			</div>
		</div>
	</div>

	<!-- Button Component Showcase -->
	<section class="mb-12">
		<Card>
			<CardHeader>
				<CardTitle>Button Component</CardTitle>
				<CardDescription>
					Versatile button with multiple variants, sizes, and states
				</CardDescription>
			</CardHeader>
			<CardContent class="space-y-6">
				<!-- Button Variants -->
				<div>
					<h3 class="text-lg font-medium mb-3">Variants</h3>
					<div class="flex flex-wrap gap-3">
						<Button variant="default">Default</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="destructive">Destructive</Button>
						<Button variant="outline">Outline</Button>
						<Button variant="ghost">Ghost</Button>
						<Button variant="link">Link</Button>
					</div>
				</div>

				<!-- Button Sizes -->
				<div>
					<h3 class="text-lg font-medium mb-3">Sizes</h3>
					<div class="flex items-center gap-3">
						<Button size="sm">Small</Button>
						<Button size="default">Default</Button>
						<Button size="lg">Large</Button>
						<Button size="icon">
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
							</svg>
						</Button>
					</div>
				</div>

				<!-- Button States -->
				<div>
					<h3 class="text-lg font-medium mb-3">States</h3>
					<div class="flex flex-wrap gap-3">
						<Button>Normal</Button>
						<Button disabled>Disabled</Button>
						<Button loading={loading} on:click={simulateLoading}>
							{loading ? 'Loading...' : 'Click to Load'}
						</Button>
						<Button href="https://github.com">Link Button</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	</section>

	<!-- Card Component Showcase -->
	<section class="mb-12">
		<Card>
			<CardHeader>
				<CardTitle>Card Component</CardTitle>
				<CardDescription>
					Flexible container with header, content, and footer sections
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<!-- Simple Card -->
					<Card>
						<CardHeader>
							<CardTitle>Simple Card</CardTitle>
							<CardDescription>Basic card with header and content</CardDescription>
						</CardHeader>
						<CardContent>
							<p class="text-sm">This is a simple card demonstrating the basic structure with header and content sections.</p>
						</CardContent>
					</Card>

					<!-- Card with Footer -->
					<Card>
						<CardHeader>
							<CardTitle>Card with Footer</CardTitle>
							<CardDescription>Card including footer actions</CardDescription>
						</CardHeader>
						<CardContent>
							<p class="text-sm">This card includes a footer section with action buttons.</p>
						</CardContent>
						<CardFooter class="gap-2">
							<Button size="sm">Action</Button>
							<Button variant="outline" size="sm">Cancel</Button>
						</CardFooter>
					</Card>

					<!-- Feature Card -->
					<Card>
						<CardHeader>
							<CardTitle class="flex items-center gap-2">
								<svg class="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
								</svg>
								Feature Card
							</CardTitle>
							<CardDescription>Enhanced card with icon and styling</CardDescription>
						</CardHeader>
						<CardContent>
							<p class="text-sm">Cards can be enhanced with icons, custom styling, and rich content to create engaging interfaces.</p>
						</CardContent>
						<CardFooter>
							<Button class="w-full">Learn More</Button>
						</CardFooter>
					</Card>
				</div>
			</CardContent>
		</Card>
	</section>

	<!-- Input Component Showcase -->
	<section class="mb-12">
		<Card>
			<CardHeader>
				<CardTitle>Input Component</CardTitle>
				<CardDescription>
					Flexible input with various types and states
				</CardDescription>
			</CardHeader>
			<CardContent class="space-y-6">
				<!-- Basic Inputs -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div class="space-y-2">
						<Label for="text-input">Text Input</Label>
						<Input id="text-input" type="text" placeholder="Enter text..." />
					</div>
					
					<div class="space-y-2">
						<Label for="email-input">Email Input</Label>
						<Input id="email-input" type="email" placeholder="Enter email..." />
					</div>
					
					<div class="space-y-2">
						<Label for="password-input">Password Input</Label>
						<Input id="password-input" type="password" placeholder="Enter password..." />
					</div>
					
					<div class="space-y-2">
						<Label for="number-input">Number Input</Label>
						<Input id="number-input" type="number" placeholder="Enter number..." />
					</div>
				</div>

				<!-- Input States -->
				<div>
					<h3 class="text-lg font-medium mb-3">Input States</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div class="space-y-2">
							<Label for="normal-input">Normal</Label>
							<Input id="normal-input" placeholder="Normal input" />
						</div>
						
						<div class="space-y-2">
							<Label for="disabled-input">Disabled</Label>
							<Input id="disabled-input" placeholder="Disabled input" disabled />
						</div>
						
						<div class="space-y-2">
							<Label for="readonly-input">Read Only</Label>
							<Input id="readonly-input" value="Read only value" readonly />
						</div>
						
						<div class="space-y-2">
							<Label for="required-input">Required</Label>
							<Input id="required-input" placeholder="Required input" required />
						</div>
					</div>
				</div>

				<!-- Form Example -->
				<div>
					<h3 class="text-lg font-medium mb-3">Form Example</h3>
					<Card>
						<CardHeader>
							<CardTitle>Contact Form</CardTitle>
							<CardDescription>Example form using Input and Button components</CardDescription>
						</CardHeader>
						<CardContent class="space-y-4">
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div class="space-y-2">
									<Label for="first-name">First Name</Label>
									<Input id="first-name" placeholder="John" />
								</div>
								<div class="space-y-2">
									<Label for="last-name">Last Name</Label>
									<Input id="last-name" placeholder="Doe" />
								</div>
							</div>
							<div class="space-y-2">
								<Label for="email">Email</Label>
								<Input id="email" type="email" placeholder="john.doe@example.com" />
							</div>
							<div class="space-y-2">
								<Label for="message">Message</Label>
								<Input id="message" placeholder="Your message here..." />
							</div>
						</CardContent>
						<CardFooter class="gap-2">
							<Button>Send Message</Button>
							<Button variant="outline">Clear</Button>
						</CardFooter>
					</Card>
				</div>
			</CardContent>
		</Card>
	</section>

	<!-- Installation Instructions -->
	<section>
		<Card>
			<CardHeader>
				<CardTitle>Installation</CardTitle>
				<CardDescription>
					How to add these components to your project
				</CardDescription>
			</CardHeader>
			<CardContent class="space-y-4">
				<div>
					<h3 class="text-lg font-medium mb-2">Install Individual Components</h3>
					<div class="space-y-2">
						<code class="block bg-muted p-3 rounded text-sm">
							npx shadcn@canary add https://tweakcn.com/r/button.json
						</code>
						<code class="block bg-muted p-3 rounded text-sm">
							npx shadcn@canary add https://tweakcn.com/r/card.json
						</code>
						<code class="block bg-muted p-3 rounded text-sm">
							npx shadcn@canary add https://tweakcn.com/r/input.json
						</code>
					</div>
				</div>
				
				<div>
					<h3 class="text-lg font-medium mb-2">Install All Foundation Components</h3>
					<code class="block bg-muted p-3 rounded text-sm">
						npx shadcn@canary add https://tweakcn.com/r/button.json https://tweakcn.com/r/card.json https://tweakcn.com/r/input.json
					</code>
				</div>
			</CardContent>
		</Card>
	</section>
</div>
