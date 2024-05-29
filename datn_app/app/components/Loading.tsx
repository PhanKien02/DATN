import {Center, Flex, HStack, Heading, Spinner} from 'native-base';
export const Loading = () => {
    return (
        <Center>
            <HStack space={2} justifyContent="center">
                <Spinner accessibilityLabel="Loading posts" />
                <Heading color="primary.500" fontSize="md">
                    Loading
                </Heading>
            </HStack>
        </Center>
    );
};
