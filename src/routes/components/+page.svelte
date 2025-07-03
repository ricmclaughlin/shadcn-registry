<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { themeStore, themes } from '$lib/stores/theme';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '$lib/components/ui/card';
	import { Input, Label } from '$lib/components/ui/input';
	import { Badge, badgeVariants } from '$lib/components/ui/badge';
	import { Alert, AlertTitle, AlertDescription } from '$lib/components/ui/alert';
	import { ModeToggle } from '$lib/components/ui/mode-toggle';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	
	// Icon imports using deep import pattern for performance
	import DownloadIcon from '@lucide/svelte/icons/download';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import SearchIcon from '@lucide/svelte/icons/search';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import InfoIcon from '@lucide/svelte/icons/info';
	import AlertTriangleIcon from '@lucide/svelte/icons/alert-triangle';
	import CheckCircleIcon from '@lucide/svelte/icons/check-circle';
	import XCircleIcon from '@lucide/svelte/icons/x-circle';
	
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
	<title>Components - UI Registry</title>
</svelte:head>

<div class="min-h-screen bg-background">
	<!-- Header -->
	<header class="border-b border-border bg-background/95 backdrop-blur">
		<div class="container mx-auto px-4 py-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-4">
					<a href="{base}/" class="text-2xl font-bold text-foreground hover:text-primary transition-colors">
						UI Registry
					</a>
					<nav class="hidden md:flex space-x-6">
						<a href="{base}/" class="text-muted-foreground hover:text-foreground transition-colors">Home</a>
						<a href="{base}/components" class="text-foreground font-medium">Components</a>
						<a href="{base}/themes" class="text-muted-foreground hover:text-foreground transition-colors">Themes</a>
					</nav>
				</div>
				
				<!-- Theme Switcher -->
				<div class="flex items-center space-x-4">
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
					<ModeToggle />
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
			<!-- Alert Component Showcase -->
			<section>
				<Card>
					<CardHeader>
						<a href="{base}/components/alert" class="block hover:opacity-80 transition-opacity">
							<CardTitle class="text-primary hover:underline">Alert Component</CardTitle>
						</a>
						<CardDescription>
							Flexible alert for displaying important messages with icon support.
						</CardDescription>
					</CardHeader>
					<CardContent class="space-y-6">
						<!-- Alert Variants -->
						<div>
							<h3 class="text-lg font-medium mb-3">Alert Types with Icons</h3>
							<div class="space-y-4">
								<Alert variant="default" icon={InfoIcon}>
									<AlertTitle>Information</AlertTitle>
									<AlertDescription>
										This is an informational alert using the default variant with an info icon.
									</AlertDescription>
								</Alert>
								
								<Alert variant="destructive" icon={AlertTriangleIcon}>
									<AlertTitle>Warning</AlertTitle>
									<AlertDescription>
										This is a warning alert using the destructive variant with a warning icon.
									</AlertDescription>
								</Alert>
							</div>
						</div>

						<!-- Alert Without Icons -->
						<div>
							<h3 class="text-lg font-medium mb-3">Alerts Without Icons</h3>
							<div class="space-y-4">
								<Alert variant="default">
									<AlertTitle>Heads up!</AlertTitle>
									<AlertDescription>
										You can add components to your app using the CLI. This alert has no icon.
									</AlertDescription>
								</Alert>
								
								<Alert variant="destructive">
									<AlertTitle>Error</AlertTitle>
									<AlertDescription>
										Your session has expired. Please log in again. This destructive alert has no icon.
									</AlertDescription>
								</Alert>
							</div>
						</div>

						<!-- Custom Alert Examples -->
						<div>
							<h3 class="text-lg font-medium mb-3">Custom Alert Examples</h3>
							<div class="space-y-4">
								<Alert variant="default" icon={CheckCircleIcon} class="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
									<AlertTitle>Success</AlertTitle>
									<AlertDescription>
										Your changes have been saved successfully! Custom styling with green colors.
									</AlertDescription>
								</Alert>
								
								<Alert variant="default" icon={XCircleIcon} class="border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
									<AlertTitle>Error</AlertTitle>
									<AlertDescription>
										Something went wrong. Please try again later. Custom styling with red colors.
									</AlertDescription>
								</Alert>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>
			
			<!-- Mode Toggle Component Showcase -->
			<section>
				<Card>
					<CardHeader>
						<a href="{base}/components/mode-toggle" class="block hover:opacity-80 transition-opacity">
							<CardTitle class="text-primary hover:underline">Mode Toggle Component</CardTitle>
						</a>
						<CardDescription>
							A toggle component for switching between light and dark modes with smooth animations.
						</CardDescription>
					</CardHeader>
					<CardContent class="space-y-6">
						<!-- Mode Toggle Example -->
						<div>
							<h3 class="text-lg font-medium mb-3">Mode Toggle</h3>
							<div class="flex items-center space-x-4">
								<ModeToggle />
								<span class="text-sm text-muted-foreground">Click to toggle between light and dark modes</span>
							</div>
						</div>
						
						<!-- Installation Instructions -->
						<div class="bg-muted p-4 rounded-lg">
							<h4 class="font-medium mb-2">Installation & Usage</h4>
							<div class="space-y-2 text-sm">
								<p>1. Install the mode-watcher dependency:</p>
								<code class="block bg-background p-2 rounded font-mono text-xs">npm install mode-watcher</code>
								<p>2. Add ModeWatcher to your root layout:</p>
								<code class="block bg-background p-2 rounded font-mono text-xs">import &#123; ModeWatcher &#125; from 'mode-watcher';</code>
								<p>3. Use the ModeToggle component anywhere in your app</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>
			
			<!-- Tabs Component Showcase -->
			<section>
				<Card>
					<CardHeader>
						<a href="{base}/components/tabs" class="block hover:opacity-80 transition-opacity">
							<CardTitle class="text-primary hover:underline">Tabs Component</CardTitle>
						</a>
						<CardDescription>
							A set of layered sections of content—known as tab panels—that are displayed one at a time.
						</CardDescription>
					</CardHeader>
					<CardContent class="space-y-6">
						<!-- Tabs Example -->
						<div>
							<h3 class="text-lg font-medium mb-3">Basic Tabs</h3>
							<Tabs.Root value="overview" class="w-full max-w-md">
								<Tabs.List>
									<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
									<Tabs.Trigger value="details">Details</Tabs.Trigger>
									<Tabs.Trigger value="settings">Settings</Tabs.Trigger>
								</Tabs.List>
								<Tabs.Content value="overview">
									<div class="p-4 border rounded-md bg-muted/30">
										<h4 class="font-medium mb-2">Overview</h4>
										<p class="text-sm text-muted-foreground">
											This is the overview tab content. Perfect for displaying summary information.
										</p>
									</div>
								</Tabs.Content>
								<Tabs.Content value="details">
									<div class="p-4 border rounded-md bg-muted/30">
										<h4 class="font-medium mb-2">Details</h4>
										<p class="text-sm text-muted-foreground">
											Detailed information goes here. Great for comprehensive data display.
										</p>
									</div>
								</Tabs.Content>
								<Tabs.Content value="settings">
									<div class="p-4 border rounded-md bg-muted/30">
										<h4 class="font-medium mb-2">Settings</h4>
										<p class="text-sm text-muted-foreground">
											Configuration options and preferences can be organized here.
										</p>
									</div>
								</Tabs.Content>
							</Tabs.Root>
						</div>

						<!-- Tabs with Different Content -->
						<div>
							<h3 class="text-lg font-medium mb-3">Tabs with Components</h3>
							<Tabs.Root value="buttons" class="w-full max-w-md">
								<Tabs.List>
									<Tabs.Trigger value="buttons">Buttons</Tabs.Trigger>
									<Tabs.Trigger value="badges">Badges</Tabs.Trigger>
								</Tabs.List>
								<Tabs.Content value="buttons">
									<div class="p-4 border rounded-md space-y-3">
										<div class="flex gap-2">
											<Button size="sm">Small</Button>
											<Button>Default</Button>
											<Button variant="outline">Outline</Button>
										</div>
									</div>
								</Tabs.Content>
								<Tabs.Content value="badges">
									<div class="p-4 border rounded-md">
										<div class="flex flex-wrap gap-2">
											<Badge>Default</Badge>
											<Badge variant="secondary">Secondary</Badge>
											<Badge variant="outline">Outline</Badge>
											<Badge variant="destructive">Destructive</Badge>
										</div>
									</div>
								</Tabs.Content>
							</Tabs.Root>
						</div>
					</CardContent>
				</Card>
			</section>
			
			<!-- Breadcrumb Component Showcase -->
			<section>
				<Card>
					<CardHeader>
						<a href="{base}/components/breadcrumb" class="block hover:opacity-80 transition-opacity">
							<CardTitle class="text-primary hover:underline">Breadcrumb Component</CardTitle>
						</a>
						<CardDescription>
							Displays the path to the current resource using a hierarchy of links.
						</CardDescription>
					</CardHeader>
					<CardContent class="space-y-6">
						<!-- Basic Breadcrumb -->
						<div>
							<h3 class="text-lg font-medium mb-3">Basic Navigation</h3>
							<Breadcrumb.Root>
								<Breadcrumb.List>
									<Breadcrumb.Item>
										<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
									</Breadcrumb.Item>
									<Breadcrumb.Separator />
									<Breadcrumb.Item>
										<Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
									</Breadcrumb.Item>
									<Breadcrumb.Separator />
									<Breadcrumb.Item>
										<Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
									</Breadcrumb.Item>
								</Breadcrumb.List>
							</Breadcrumb.Root>
						</div>

						<!-- Breadcrumb with Icons -->
						<div>
							<h3 class="text-lg font-medium mb-3">With Icons</h3>
							<Breadcrumb.Root>
								<Breadcrumb.List>
									<Breadcrumb.Item>
										<Breadcrumb.Link href="/" class="flex items-center gap-2">
											<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"/>
											</svg>
											Dashboard
										</Breadcrumb.Link>
									</Breadcrumb.Item>
									<Breadcrumb.Separator />
									<Breadcrumb.Item>
										<Breadcrumb.Page class="flex items-center gap-2">
											<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
											</svg>
											Settings
										</Breadcrumb.Page>
									</Breadcrumb.Item>
								</Breadcrumb.List>
							</Breadcrumb.Root>
						</div>
					</CardContent>
				</Card>
			</section>
			
			<!-- Badge Component Showcase -->
			<section>
				<Card>
					<CardHeader>
						<a href="{base}/components/badge" class="block hover:opacity-80 transition-opacity">
							<CardTitle class="text-primary hover:underline">Badge Component</CardTitle>
						</a>
						<CardDescription>
							Versatile badge for displaying status, tags, and notifications.
						</CardDescription>
					</CardHeader>
					<CardContent class="space-y-6">
						<!-- Badge Variants -->
						<div>
							<h3 class="text-lg font-medium mb-3">Variants</h3>
							<div class="flex flex-wrap gap-3">
								<Badge variant="default">Default</Badge>
								<Badge variant="secondary">Secondary</Badge>
								<Badge variant="destructive">Destructive</Badge>
								<Badge variant="outline">Outline</Badge>
							</div>
						</div>

						<!-- Badge Use Cases -->
						<div>
							<h3 class="text-lg font-medium mb-3">Common Use Cases</h3>
							<div class="space-y-4">
								<div class="flex items-center gap-2">
									<span class="text-sm">Status indicators:</span>
									<Badge variant="default">Active</Badge>
									<Badge variant="secondary">Pending</Badge>
									<Badge variant="destructive">Error</Badge>
								</div>
								
								<div class="flex items-center gap-2">
									<span class="text-sm">Tags:</span>
									<Badge variant="outline">React</Badge>
									<Badge variant="outline">TypeScript</Badge>
									<Badge variant="outline">Svelte</Badge>
								</div>
								
								<div class="flex items-center gap-2">
									<span class="text-sm">Notifications:</span>
									<Badge variant="destructive">3</Badge>
									<Badge variant="default">12</Badge>
									<Badge variant="secondary">New</Badge>
								</div>
							</div>
						</div>

						<!-- Badge as Link -->
						<div>
							<h3 class="text-lg font-medium mb-3">Badge as Link</h3>
							<div class="flex flex-wrap gap-3">
								<a href="#" class={badgeVariants({ variant: 'default' })}>Link Badge</a>
								<a href="#" class={badgeVariants({ variant: 'outline' })}>Outline Link</a>
								<a href="#" class={badgeVariants({ variant: 'secondary' })}>Secondary Link</a>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>
			<!-- Buttons Section -->
			<section>
				<Card>
					<CardHeader>
						<a href="{base}/components/button" class="block hover:opacity-80 transition-opacity">
							<CardTitle class="text-primary hover:underline">Button Component</CardTitle>
						</a>
						<CardDescription>
							Versatile button with multiple variants, sizes, and states.
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
							</div>
						</div>

						<!-- Button with Icons -->
						<div>
							<h3 class="text-lg font-medium mb-3">Buttons with Icons</h3>
							<div class="flex flex-wrap gap-3">
								<Button variant="default" icon={DownloadIcon}>Download</Button>
								<Button variant="secondary" icon={PlusIcon}>Add Item</Button>
								<Button variant="outline" icon={SearchIcon}>Search</Button>
								<Button variant="ghost" icon={SettingsIcon} iconPlacement="right">Settings</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>

			<!-- Cards Section -->
			<section>
				<Card>
					<CardHeader>
						<a href="{base}/components/card" class="block hover:opacity-80 transition-opacity">
							<CardTitle class="text-primary hover:underline">Card Component</CardTitle>
						</a>
						<CardDescription>
							Flexible container with header, content, and footer sections.
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
						<a href="{base}/components/input" class="block hover:opacity-80 transition-opacity">
							<CardTitle class="text-primary hover:underline">Input Component</CardTitle>
						</a>
						<CardDescription>
							Flexible input with various types and states.
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
