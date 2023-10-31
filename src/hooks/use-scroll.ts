export default function useScroll() {
  const showScroll = () => {
    document.body.style.overflowY = 'visible';
  };

  const hideScroll = () => {
    document.body.style.overflowY = 'hidden';
  };

  return { showScroll, hideScroll };
}

