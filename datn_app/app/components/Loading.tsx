import {Center, HStack, Heading, Spinner} from 'native-base';
export const Loading = ({title = 'Loading'}) => {
    return (
        <Center>
            <HStack space={2} justifyContent="center">
                <Spinner accessibilityLabel="Loading posts" />
                <Heading color="primary.500" fontSize="md">
                    {title}
                </Heading>
            </HStack>
        </Center>
    );
};
