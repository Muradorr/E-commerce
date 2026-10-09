import PageContainer from '../components/PageContainer';
import EmptyState from '../components/EmptyState';

function NotFound() {
  return (
    <PageContainer>
      <EmptyState
        icon="search"
        title="404, page not found"
        message="The page you are looking for does not exist. Use the menu above or head back to the shop."
        actionLabel="Back to shop"
        actionTo="/"
      />
    </PageContainer>
  );
}

export default NotFound;
