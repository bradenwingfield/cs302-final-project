import ThemeRegistry from '../components/ThemeRegistry';

export const metadata = {
  title: 'Case Finder',
  description: 'Find similar cases and policies',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}