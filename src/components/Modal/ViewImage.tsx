import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent
        maxH={600}
        maxW={600}
        width="initial"
        backgroundColor="transparent"
        margin="auto"
      >
        <ModalBody padding={0}>
          <Image src={imgUrl} />
        </ModalBody>

        <ModalFooter
          justifyContent="flex-start"
          background="pGray.800"
          borderBottomRadius={8}
          width="100%"
        >
          <Link href={imgUrl} target="_blank">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
