export const showToast = (
  toast,
  title,
  description,
  status,
  duration,
  isClosable
) => {
  return toast({
    title: title,
    description: description,
    status: status,
    duration: duration,
    isClosable: isClosable,
  });
};
