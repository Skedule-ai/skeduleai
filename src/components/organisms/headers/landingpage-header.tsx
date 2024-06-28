import { PrimaryButton, PrimaryOutlineButton } from '@/components/atoms/button';
import Container from '@/components/atoms/container';
import { Flex } from '@/components/atoms/flex';
import ScheduleAILogo from '@/components/atoms/icons/schedule-ai-logo';
import { Body } from '@/components/atoms/typography';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const LandingPageHeader = () => {
    return (
        <Container as='header' fullWidth className='mx-auto pt-10'>
            <Flex dir='row' justifyContent='between' alignItems='center'>
                <ScheduleAILogo />
                <SignedOut>
                    <Flex dir='row' gapX={4}>
                        <SignInButton>
                            <PrimaryOutlineButton>Sign in</PrimaryOutlineButton>
                        </SignInButton>
                        <SignUpButton signInForceRedirectUrl={'/appointments'}>
                            <PrimaryButton>Sign up</PrimaryButton>
                        </SignUpButton>
                    </Flex>
                </SignedOut>
                <SignedIn>
                    <Flex dir='row' gapX={4} alignItems='center'>
                        <Link href='/appointments'>
                            <Body color='primary'>Appointments</Body>
                        </Link>
                        <UserButton />
                    </Flex>
                </SignedIn>
            </Flex>
        </Container>
    );
};

export default LandingPageHeader;
