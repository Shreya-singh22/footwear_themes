import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted text-center">
      <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
      <p className="mb-8 text-xl text-muted-foreground">Oops! Page not found</p>
      <Link href="/" className="text-primary underline hover:text-primary/90">
        Return to Home
      </Link>
    </div>
  );
}
