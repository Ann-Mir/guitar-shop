import {ReactNode} from 'react';


type MainLayoutProps = {
  children: ReactNode;
};

function MainLayout({ children }: MainLayoutProps): JSX.Element {

  return (
    <main className="page-content" data-testid="main-layout">
      <div className="container">
        {children}
      </div>
    </main>
  );
}


export default MainLayout;
