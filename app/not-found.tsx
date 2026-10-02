import Button from "@/components/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-svh max-w-3xl flex-col items-center justify-center px-5 text-center sm:px-8">
      <p className="eyebrow">404</p>
      <h1 className="display mt-6 text-5xl text-cream sm:text-7xl">
        This cup is <em>empty.</em>
      </h1>
      <p className="mt-6 max-w-md text-sand/85">
        The page you were looking for has been drunk, or never existed. Let us
        pour you another.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button href="/">Back home</Button>
        <Button href="/products" variant="outline">
          The portfolio
        </Button>
      </div>
    </section>
  );
}
