<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { themeStore, themes } from '$lib/stores/theme';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '$lib/components/ui/card';
	import { Input, Label } from '$lib/components/ui/input';
	
	let currentTheme = 'default';
	let loading = false;
	let formData = {
		name: '',
		email: '',
		category: 'General Inquiry',
		message: ''
	};
	
	// Subscribe to theme store
	$: currentTheme = $themeStore;
	
	// Get the registry base URL
	$: registryBaseUrl = typeof window !== 'undefined' ? window.location.origin + base : '';
	
	function switchTheme(themeId: string) {
		themeStore.setTheme(themeId);
	}
	
	function simulateLoading() {
		loading = true;
		setTimeout(() => {
			loading = false;
		}, 2000);
	}
	
	function handleSubmit() {
		console.log('Form submitted:', formData);
		simulateLoading();
	}
	
	// Load theme on mount
	onMount(() => {
		themeStore.loadTheme();
	});
</script>

<svelte:head>
	<title>Components - shadcn-svelte Themed Registry</title>
</svelte:head>

<div class="min-h-screen bg-background">
	<!-- Header -->
	<header class="border-b border-border bg-background/95 backdrop-blur">
		<div class="container mx-auto px-4 py-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-4">
					<a href="{base}/" class="text-2xl font-bold text-foreground hover:text-primary transition-colors">
						shadcn-svelte
					</a>
					<nav class="hidden md:flex space-x-6">
						<a href="{base}/" class="text-muted-foreground hover:text-foreground transition-colors">Home</a>
						<a href="{base}/components" class="text-foreground font-medium">Components</a>
						<a href="{base}/themes" class="text-muted-foreground hover:text-foreground transition-colors">Themes</a>
					</nav>
				</div>
				
				<!-- Theme Switcher -->
				<div class="flex items-center space-x-2">
					<span class="text-sm text-muted-foreground">Theme:</span>
					<select 
						bind:value={currentTheme} 
						on:change={(e) => switchTheme(e.target.value)}
						class="px-3 py-1 text-sm border border-border rounded-md bg-background text-foreground"
					>
						{#each themes as theme}
							<option value={theme.id}>{theme.name}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>
	</header>

	<div class="container mx-auto px-4 py-8">
		<div class="mb-8">
			<h1 class="text-4xl font-bold text-foreground mb-4">Component Showcase</h1>
			<p class="text-xl text-muted-foreground">
				See how components look across different themes. Switch themes using the selector above.
			</p>
		</div>

		<!-- Current Theme Info -->
		<div class="bg-card border border-border rounded-lg p-4 mb-8">
			<div class="flex items-center justify-between">
				<div>
					<h3 class="font-semibold text-card-foreground">
						Current Theme: {themes.find(t => t.id === currentTheme)?.name}
					</h3>
					<p class="text-sm text-muted-foreground">
						{themes.find(t => t.id === currentTheme)?.description}
					</p>
				</div>
				{#if currentTheme !== 'default'}
					<div class="text-right">
						<p class="text-xs text-muted-foreground mb-1">Install this theme:</p>
						<code class="text-xs bg-muted px-2 py-1 rounded font-mono break-all">
							npx shadcn-svelte@latest add {registryBaseUrl}/api/r/{currentTheme}-theme
						</code>
					</div>
				{/if}
			</div>
		</div>

		<!-- Component Examples -->
		<div class="space-y-12">
			<!-- Buttons Section -->
			<section>
				<Card>
					<CardHeader>
						<CardTitle>Button Component</CardTitle>
						<CardDescription>
							Versatile button with multiple variants, sizes, and states. Install with:
							<code class="text-xs bg-muted px-2 py-1 rounded font-mono ml-2">
								npx shadcn@canary add {registryBaseUrl}/r/button.json
							</code>
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
								<Button {loading} on:click={simulateLoading}>
									{loading ? 'Loading...' : 'Click to Load'}
								</Button>
								<Button href="https://github.com">Link Button</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>

			<!-- Cards Section -->
			<section>
				<Card>
					<CardHeader>
						<CardTitle>Card Component</CardTitle>
						<CardDescription>
							Flexible container with header, content, and footer sections. Install with:
							<code class="text-xs bg-muted px-2 py-1 rounded font-mono ml-2">
								npx shadcn@canary add {registryBaseUrl}/r/card.json
							</code>
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

			<!-- Form Elements Section -->
			<section>
				<Card>
					<CardHeader>
						<CardTitle>Input Component</CardTitle>
						<CardDescription>
							Flexible input with various types and states. Install with:
							<code class="text-xs bg-muted px-2 py-1 rounded font-mono ml-2">
								npx shadcn@canary add {registryBaseUrl}/r/input.json
							</code>
						</CardDescription>
					</CardHeader>
					<CardContent class="space-y-8">
						<!-- Basic Inputs -->
						<div>
							<h3 class="text-lg font-medium mb-4">Input Types</h3>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div class="space-y-2">
									<Label for_="text-input">Text Input</Label>
									<Input id="text-input" type="text" placeholder="Enter text..." bind:value={formData.name} />
								</div>
								
								<div class="space-y-2">
									<Label for_="email-input">Email Input</Label>
									<Input id="email-input" type="email" placeholder="Enter email..." bind:value={formData.email} />
								</div>
								
								<div class="space-y-2">
									<Label for_="password-input">Password Input</Label>
									<Input id="password-input" type="password" placeholder="Enter password..." />
								</div>
								
								<div class="space-y-2">
									<Label for_="number-input">Number Input</Label>
									<Input id="number-input" type="number" placeholder="Enter number..." />
								</div>
							</div>
						</div>

						<!-- Input States -->
						<div>
							<h3 class="text-lg font-medium mb-4">Input States</h3>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div class="space-y-2">
									<Label for_="normal-input">Normal</Label>
									<Input id="normal-input" placeholder="Normal input" />
								</div>
								
								<div class="space-y-2">
									<Label for_="disabled-input">Disabled</Label>
									<Input id="disabled-input" placeholder="Disabled input" disabled />
								</div>
								
								<div class="space-y-2">
									<Label for_="readonly-input">Read Only</Label>
									<Input id="readonly-input" value="Read only value" readonly />
								</div>
								
								<div class="space-y-2">
									<Label for_="required-input">Required</Label>
									<Input id="required-input" placeholder="Required input" required />
								</div>
							</div>
						</div>

						<!-- Complete Form Example -->
						<div>
							<h3 class="text-lg font-medium mb-4">Complete Form Example</h3>
							<div class="grid md:grid-cols-2 gap-8">
								<Card>
									<CardHeader>
										<CardTitle>Contact Form</CardTitle>
										<CardDescription>Example form using Input and Button components</CardDescription>
									</CardHeader>
									<CardContent class="space-y-4">
										<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div class="space-y-2">
												<Label for_="first-name">First Name</Label>
												<Input id="first-name" placeholder="John" />
											</div>
											<div class="space-y-2">
												<Label for_="last-name">Last Name</Label>
												<Input id="last-name" placeholder="Doe" />
											</div>
										</div>
										<div class="space-y-2">
											<Label for_="contact-email">Email</Label>
											<Input id="contact-email" type="email" placeholder="john.doe@example.com" />
										</div>
										<div class="space-y-2">
											<Label for_="message">Message</Label>
											<Input id="message" placeholder="Your message here..." />
										</div>
									</CardContent>
									<CardFooter class="gap-2">
										<Button on:click={handleSubmit} {loading}>
											{loading ? 'Sending...' : 'Send Message'}
										</Button>
										<Button variant="outline">Clear</Button>
									</CardFooter>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle>Settings Panel</CardTitle>
										<CardDescription>Various input types and controls</CardDescription>
									</CardHeader>
									<CardContent class="space-y-4">
										<div class="space-y-2">
											<Label for_="username">Username</Label>
											<Input id="username" placeholder="Enter username" />
										</div>
										
										<div class="space-y-2">
											<Label for_="language">Language</Label>
											<select 
												id="language"
												class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
											>
												<option>English</option>
												<option>Spanish</option>
												<option>French</option>
											</select>
										</div>
										
										<div class="space-y-2">
											<Label for_="bio">Bio</Label>
											<textarea 
												id="bio"
												placeholder="Tell us about yourself..."
												rows="3"
												class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
											></textarea>
										</div>
									</CardContent>
									<CardFooter class="gap-2">
										<Button>Save Settings</Button>
										<Button variant="outline">Reset</Button>
									</CardFooter>
								</Card>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>

			<!-- Installation Instructions -->
			<section>
				<Card>
					<CardHeader>
						<CardTitle>Installation & Usage</CardTitle>
						<CardDescription>
							How to add these foundation components to your project
						</CardDescription>
					</CardHeader>
					<CardContent class="space-y-6">
						<div>
							<h3 class="text-lg font-medium mb-3">Install Individual Components</h3>
							<div class="space-y-3">
								<div>
									<p class="text-sm text-muted-foreground mb-2">Button Component:</p>
									<code class="block bg-muted p-3 rounded text-sm font-mono">
										npx shadcn@canary add {registryBaseUrl}/r/button.json
									</code>
								</div>
								<div>
									<p class="text-sm text-muted-foreground mb-2">Card Component:</p>
									<code class="block bg-muted p-3 rounded text-sm font-mono">
										npx shadcn@canary add {registryBaseUrl}/r/card.json
									</code>
								</div>
								<div>
									<p class="text-sm text-muted-foreground mb-2">Input Component:</p>
									<code class="block bg-muted p-3 rounded text-sm font-mono">
										npx shadcn@canary add {registryBaseUrl}/r/input.json
									</code>
								</div>
							</div>
						</div>
						
						<div>
							<h3 class="text-lg font-medium mb-3">Install All Foundation Components</h3>
							<code class="block bg-muted p-3 rounded text-sm font-mono">
								npx shadcn@canary add {registryBaseUrl}/r/button.json {registryBaseUrl}/r/card.json {registryBaseUrl}/r/input.json
							</code>
						</div>

						<div>
							<h3 class="text-lg font-medium mb-3">Usage Examples</h3>
							<div class="space-y-4">
								<div>
									<p class="text-sm text-muted-foreground mb-2">Import and use Button:</p>
									<code class="block bg-muted p-3 rounded text-sm font-mono">
										import &#123; Button &#125; from '$lib/components/ui/button';<br/>
										<br/>
										&lt;Button variant="default"&gt;Click me&lt;/Button&gt;<br/>
										&lt;Button variant="outline" size="sm"&gt;Small outline&lt;/Button&gt;
									</code>
								</div>
								<div>
									<p class="text-sm text-muted-foreground mb-2">Import and use Card:</p>
									<code class="block bg-muted p-3 rounded text-sm font-mono">
										import &#123; Card, CardHeader, CardTitle, CardContent &#125; from '$lib/components/ui/card';<br/>
										<br/>
										&lt;Card&gt;<br/>
										&nbsp;&nbsp;&lt;CardHeader&gt;<br/>
										&nbsp;&nbsp;&nbsp;&nbsp;&lt;CardTitle&gt;Title&lt;/CardTitle&gt;<br/>
										&nbsp;&nbsp;&lt;/CardHeader&gt;<br/>
										&nbsp;&nbsp;&lt;CardContent&gt;Content&lt;/CardContent&gt;<br/>
										&lt;/Card&gt;
									</code>
								</div>
								<div>
									<p class="text-sm text-muted-foreground mb-2">Import and use Input:</p>
									<code class="block bg-muted p-3 rounded text-sm font-mono">
										import &#123; Input, Label &#125; from '$lib/components/ui/input';<br/>
										<br/>
										&lt;Label for_="email"&gt;Email&lt;/Label&gt;<br/>
										&lt;Input id="email" type="email" placeholder="Enter email" /&gt;
									</code>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	</div>
</div>

<style>
	/* Theme-specific CSS variables */
	:global(.theme-material) {
		--radius: 0.75rem;
		--background: oklch(0.99 0.005 106.423);
		--foreground: oklch(0.15 0.006 285.82);
		--primary: oklch(0.492 0.201 264.052);
		--primary-foreground: oklch(0.99 0.005 106.423);
		--muted: oklch(0.96 0.006 285.82);
		--muted-foreground: oklch(0.45 0.006 285.82);
		--card: oklch(1 0 0);
		--border: oklch(0.92 0.006 285.82);
		--secondary: oklch(0.96 0.006 285.82);
		--secondary-foreground: oklch(0.15 0.006 285.82);
		--accent: oklch(0.96 0.006 285.82);
		--accent-foreground: oklch(0.15 0.006 285.82);
		--destructive: oklch(0.576 0.196 17.38);
		--destructive-foreground: oklch(0.99 0.005 106.423);
		--input: oklch(0.92 0.006 285.82);
		--ring: oklch(0.492 0.201 264.052);
	}
	
	:global(.theme-minimal) {
		--radius: 0.25rem;
		--background: oklch(1 0 0);
		--foreground: oklch(0.1 0 0);
		--primary: oklch(0.1 0 0);
		--primary-foreground: oklch(1 0 0);
		--muted: oklch(0.97 0 0);
		--muted-foreground: oklch(0.5 0 0);
		--card: oklch(1 0 0);
		--border: oklch(0.9 0 0);
		--secondary: oklch(0.97 0 0);
		--secondary-foreground: oklch(0.1 0 0);
		--accent: oklch(0.97 0 0);
		--accent-foreground: oklch(0.1 0 0);
		--destructive: oklch(0.576 0.196 17.38);
		--destructive-foreground: oklch(1 0 0);
		--input: oklch(0.9 0 0);
		--ring: oklch(0.1 0 0);
	}
	
	:global(.theme-corporate) {
		--radius: 0.375rem;
		--background: oklch(0.99 0.002 247.839);
		--foreground: oklch(0.15 0.01 220);
		--primary: oklch(0.25 0.05 220);
		--primary-foreground: oklch(0.99 0.002 247.839);
		--muted: oklch(0.95 0.01 220);
		--muted-foreground: oklch(0.45 0.02 220);
		--card: oklch(1 0 0);
		--border: oklch(0.9 0.01 220);
		--secondary: oklch(0.95 0.01 220);
		--secondary-foreground: oklch(0.15 0.01 220);
		--accent: oklch(0.95 0.01 220);
		--accent-foreground: oklch(0.15 0.01 220);
		--destructive: oklch(0.576 0.196 17.38);
		--destructive-foreground: oklch(0.99 0.002 247.839);
		--input: oklch(0.9 0.01 220);
		--ring: oklch(0.25 0.05 220);
	}
	
	:global(.theme-twitter) {
		--radius: 1.3rem;
		--background: oklch(1.00 0 0);
		--foreground: oklch(0.19 0.01 248.51);
		--primary: oklch(0.67 0.16 245.00);
		--primary-foreground: oklch(1.00 0 0);
		--muted: oklch(0.92 0.00 286.37);
		--muted-foreground: oklch(0.19 0.01 248.51);
		--card: oklch(0.98 0.00 197.14);
		--border: oklch(0.93 0.01 231.66);
		--secondary: oklch(0.19 0.01 248.51);
		--secondary-foreground: oklch(1.00 0 0);
		--accent: oklch(0.94 0.02 250.85);
		--accent-foreground: oklch(0.67 0.16 245.00);
		--destructive: oklch(0.62 0.24 25.77);
		--destructive-foreground: oklch(1.00 0 0);
		--input: oklch(0.98 0.00 228.78);
		--ring: oklch(0.68 0.16 243.35);
	}
	
	:global(.theme-bubblegum) {
		--radius: 0.4rem;
		--background: oklch(0.94 0.02 345.70);
		--foreground: oklch(0.47 0 0);
		--primary: oklch(0.62 0.18 348.14);
		--primary-foreground: oklch(1.00 0 0);
		--muted: oklch(0.88 0.05 212.10);
		--muted-foreground: oklch(0.58 0 0);
		--card: oklch(0.95 0.05 86.89);
		--border: oklch(0.62 0.18 348.14);
		--secondary: oklch(0.81 0.07 198.19);
		--secondary-foreground: oklch(0.32 0 0);
		--accent: oklch(0.92 0.08 87.67);
		--accent-foreground: oklch(0.32 0 0);
		--destructive: oklch(0.71 0.17 21.96);
		--destructive-foreground: oklch(1.00 0 0);
		--input: oklch(0.92 0 0);
		--ring: oklch(0.70 0.16 350.75);
	}
	
	:global(.theme-catppuccin) {
		--radius: 0.35rem;
		--background: oklch(0.96 0.01 264.53);
		--foreground: oklch(0.44 0.04 279.33);
		--primary: oklch(0.55 0.25 297.02);
		--primary-foreground: oklch(1.00 0 0);
		--muted: oklch(0.91 0.01 264.51);
		--muted-foreground: oklch(0.55 0.03 279.08);
		--card: oklch(1.00 0 0);
		--border: oklch(0.81 0.02 271.20);
		--secondary: oklch(0.86 0.01 268.48);
		--secondary-foreground: oklch(0.44 0.04 279.33);
		--accent: oklch(0.68 0.14 235.38);
		--accent-foreground: oklch(1.00 0 0);
		--destructive: oklch(0.55 0.22 19.81);
		--destructive-foreground: oklch(1.00 0 0);
		--input: oklch(0.86 0.01 268.48);
		--ring: oklch(0.55 0.25 297.02);
	}
	
	:global(.theme-graphite) {
		--radius: 0.35rem;
		--background: oklch(0.96 0 0);
		--foreground: oklch(0.32 0 0);
		--primary: oklch(0.49 0 0);
		--primary-foreground: oklch(1.00 0 0);
		--muted: oklch(0.89 0 0);
		--muted-foreground: oklch(0.51 0 0);
		--card: oklch(0.97 0 0);
		--border: oklch(0.86 0 0);
		--secondary: oklch(0.91 0 0);
		--secondary-foreground: oklch(0.32 0 0);
		--accent: oklch(0.81 0 0);
		--accent-foreground: oklch(0.32 0 0);
		--destructive: oklch(0.56 0.19 25.86);
		--destructive-foreground: oklch(1.00 0 0);
		--input: oklch(0.91 0 0);
		--ring: oklch(0.49 0 0);
	}
</style>
