import { PrimaryButton, PrimaryOutlineButton } from '@/components/atoms/button';
import Card from '@/components/atoms/card';
import Container from '@/components/atoms/container';
import Divider from '@/components/atoms/divider';
import { Flex, FlexItem } from '@/components/atoms/flex';
import ScheduleAILogo from '@/components/atoms/icons/schedule-ai-logo';
import Text from '@/components/atoms/text';
import {
    Header1,
    Header2,
    LargeHeader1,
    Paragraph,
    SubHeader2,
} from '@/components/atoms/typography';
import UnorderedList from '@/components/molecules/list/unordered-list';
import LandingPageHeader from '@/components/organisms/headers/landingpage-header';
import {} from '@strapi/icons';

export default function Home() {
    return (
        <main>
            <LandingPageHeader />
            <Flex
                dir='column'
                justifyContent='center'
                alignItems='center'
                gapY={5}
                className='my-32'
            >
                <LargeHeader1 align='center'>
                    Seamless, streamlined
                    <br />
                    booking experiences
                </LargeHeader1>
                <SubHeader2 align='center'>
                    Streamlined online meetings with integrated
                    <br /> payment capabilities. Schedule, meet, and
                    <br /> transact seamlessly in one platform.
                </SubHeader2>
                <PrimaryButton>Get started</PrimaryButton>
            </Flex>
            <Flex dir='column' justifyContent='center' alignItems='center' gapY={2}>
                <SubHeader2 align='center'>
                    &quot;Share availability and eliminate
                    <br /> scheduling back-and-forth hassle.&quot;
                </SubHeader2>
                <Container className='relative overflow-auto rounded-xl p-8'>
                    <iframe
                        src='https://www.youtube.com/embed/bf2tFixliMA?si=DPUxo1SR7zXyGEk6'
                        title='YouTube video player'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        referrerPolicy='strict-origin-when-cross-origin'
                        allowFullScreen
                        className='aspect-video w-full rounded-lg shadow-lg'
                        loading='lazy'
                    ></iframe>
                </Container>
            </Flex>
            <Flex
                dir='column'
                alignItems='center'
                justifyContent='center'
                gapY={4}
                className='my-16'
            >
                <Flex
                    dir='column'
                    alignItems='center'
                    justifyContent='center'
                    gapY={2}
                    className='my-16'
                >
                    <LargeHeader1 align='center'>Diverse Features</LargeHeader1>
                    <Header2>
                        Explore our diverse features tailored to meet the dynamic needs of modern
                        businesses.
                    </Header2>
                </Flex>
                <Container>
                    <Flex dir='row' gapX={5} className=''>
                        <Card className='w-1/3 px-8 pb-8 pt-12'>
                            <Flex dir='column' gapY={4}>
                                <Header1>Scheduling Automation</Header1>
                                <UnorderedList
                                    items={[
                                        'Customizable Scheduling Links: Users can create personalized scheduling links to share with others, allowing them to pick a time that works best for both parties.',
                                        'Availability Management: Users can set their availability preferences, specifying the days and times they are available for meetings.',
                                    ]}
                                />
                            </Flex>
                        </Card>
                        <Flex dir='column' gapY={5} className='w-1/3'>
                            <Card className='px-8 pb-8 pt-12'>
                                <Flex dir='column' gapY={4}>
                                    <Header1>Multiple Calendar Sync</Header1>
                                    <Header2>
                                        Skedule integrates with popular calendar systems such as
                                        Google Calendar, Outlook, Office 365, and iCloud, ensuring
                                        that all events are synced across platforms.
                                    </Header2>
                                </Flex>
                            </Card>
                            <Card className='px-8 pb-8 pt-12'>
                                <Flex dir='column' gapY={4}>
                                    <Header1>Designation types</Header1>
                                    <Header2>
                                        Customized UI experience specific to user’s designation
                                        (e.g. doctor can track and store patient&apos;s previous
                                        appointment notes and records)
                                    </Header2>
                                </Flex>
                            </Card>
                        </Flex>
                        <Card className='w-1/3 px-8 pb-8 pt-12'>
                            <Flex dir='column' gapY={4}>
                                <Header1>Email Notifications and Reminders</Header1>
                                <Header2>
                                    Enhance meeting productivity with automated confirmations and
                                    reminders. Timely emails are sent to both you and attendees,
                                    significantly reducing no-shows and keeping everyone informed.
                                    This eliminates the need for manual follow-ups, streamlining
                                    communication and fostering a culture of punctuality. As a
                                    result, meetings become more efficient and focused, maximizing
                                    your valuable time and that of your colleagues
                                </Header2>
                            </Flex>
                        </Card>
                    </Flex>
                </Container>
            </Flex>
            <Flex
                dir='column'
                alignItems='center'
                justifyContent='center'
                gapY={5}
                className='my-16'
            >
                <Flex
                    dir='column'
                    alignItems='center'
                    justifyContent='center'
                    gapY={2}
                    className='my-16'
                >
                    <LargeHeader1 align='center'>Plans & Billing</LargeHeader1>
                    <Header2>
                        Explore our diverse features tailored to meet the dynamic needs of modern
                        businesses.
                    </Header2>
                </Flex>
                <Flex dir='row' gapX={5}>
                    <Card>
                        <Flex dir='column' className='h-full p-4'>
                            <Flex dir='column' gapX={4}>
                                <Header1>Basic</Header1>
                                <Flex inline alignItems='end' gapY={4}>
                                    <LargeHeader1>$0</LargeHeader1>
                                    <Header1>/Month</Header1>
                                </Flex>
                                <Divider />
                            </Flex>

                            <FlexItem>
                                <UnorderedList
                                    items={[
                                        'Manage your personal availability',
                                        'Share scheduling links',
                                        'Basic appointment booking',
                                        'Limited integrations (e.g., Google Calendar)',
                                    ]}
                                />
                            </FlexItem>

                            <FlexItem alignSelf='center' className='mt-auto'>
                                <PrimaryOutlineButton>Get started</PrimaryOutlineButton>
                            </FlexItem>
                        </Flex>
                    </Card>
                    <Card>
                        <Flex dir='column' className='h-full p-4'>
                            <Flex dir='column' gapX={4}>
                                <Header1>Pro</Header1>
                                <Flex inline alignItems='end' gapY={4}>
                                    <LargeHeader1>$10</LargeHeader1>
                                    <Header1>/Month</Header1>
                                </Flex>
                                <Divider />
                            </Flex>
                            <UnorderedList
                                items={[
                                    'All Free features, plus:',
                                    'Unlimited scheduling links',
                                    'Team scheduling (up to 5 users)',
                                    'Custom branding',
                                    'Premium integrations (e.g., Zoom, Zapier)',
                                    'Email and chat support',
                                ]}
                            />
                            <FlexItem alignSelf='center' className='mt-auto'>
                                <PrimaryOutlineButton>Get started</PrimaryOutlineButton>
                            </FlexItem>
                        </Flex>
                    </Card>
                    <Card>
                        <Flex dir='column' className='h-full p-4' gapY={2}>
                            <Flex dir='column' gapX={4}>
                                <Header1>Business</Header1>
                                <Flex inline alignItems='end' gapY={4}>
                                    <LargeHeader1>$25</LargeHeader1>
                                    <Header1>/Month</Header1>
                                </Flex>
                                <Divider />
                            </Flex>
                            <FlexItem>
                                <UnorderedList
                                    items={[
                                        'All Pro features, plus:',
                                        'Priority customer support',
                                        'Advanced security features ',
                                        'Group scheduling',
                                        'In-depth analytics and reporting',
                                        'Custom onboarding and training',
                                    ]}
                                />
                            </FlexItem>
                            <FlexItem alignSelf='center' className='mt-auto'>
                                <PrimaryOutlineButton>Get started</PrimaryOutlineButton>
                            </FlexItem>
                        </Flex>
                    </Card>
                </Flex>
            </Flex>
            <Flex
                dir='column'
                alignItems='center'
                justifyContent='center'
                gapY={5}
                className='my-16'
            >
                <Flex
                    dir='column'
                    alignItems='center'
                    justifyContent='center'
                    gapY={2}
                    className='my-16'
                >
                    <LargeHeader1 align='center'>FAQs</LargeHeader1>
                    <Header2>
                        Explore our diverse features tailored to meet the dynamic needs of modern
                        businesses.
                    </Header2>
                </Flex>
                <Container>
                    <Flex dir='column' gapY={5}>
                        <Card className='w-full px-8 py-4'>
                            What are the benefits of using Skedule compared to traditional
                            scheduling methods (e.g., email back-and-forth)?
                        </Card>
                        <Card className='w-full px-8 py-4'>Is Skedule free to use?</Card>
                        <Card className='w-full px-8 py-4'>
                            How does Skedule integrate with my calendar?
                        </Card>
                        <Card className='w-full px-8 py-4'>
                            Does Skedule offer any security features to protect my data?
                        </Card>
                    </Flex>
                </Container>
            </Flex>
            <Flex
                dir='column'
                alignItems='center'
                justifyContent='center'
                gapY={5}
                className='my-16'
            >
                <Flex
                    dir='column'
                    alignItems='center'
                    justifyContent='center'
                    gapY={2}
                    className='my-16'
                >
                    <LargeHeader1 align='center'>What our users say?</LargeHeader1>
                    <Header2>
                        Explore our diverse features tailored to meet the dynamic needs of modern
                        businesses.
                    </Header2>
                </Flex>
                <Flex dir='row' gapX={5}>
                    <Card className='h-[400px] w-[600px]'>Card</Card>
                    <Card className='h-[400px] w-[600px]'>Card</Card>
                </Flex>
            </Flex>
            <Container as='footer' className='mx-auto my-4'>
                <Flex dir='row' gapX={5} justifyContent='between'>
                    <Flex dir='column' gapY={2} className='w-1/3'>
                        <ScheduleAILogo />
                        <FlexItem className='max-w-xs'>
                            <Paragraph>
                                Our vision is to empower businesses with intuitive and efficient
                                software solutions that foster innovation and drive success.
                            </Paragraph>
                        </FlexItem>
                    </Flex>
                    <Flex gapX={5} className='w-1/3'>
                        <Flex dir='column' gapY={5}>
                            <Text size='lg' weight='bold' className='leading-5'>
                                Quick Menu
                            </Text>
                            <Text weight='medium' className='leading-5'>
                                About
                            </Text>
                            <Text weight='medium' className='leading-5'>
                                Features
                            </Text>
                            <Text weight='medium' className='leading-5'>
                                Pricing
                            </Text>
                            <Text weight='medium' className='leading-5'>
                                Contact
                            </Text>
                        </Flex>
                        <Flex dir='column' gapY={5}>
                            <Text size='lg' weight='bold' className='leading-5'>
                                Resources
                            </Text>
                            <Text weight='medium' className='leading-5'>
                                Newsletter
                            </Text>
                            <Text weight='medium' className='leading-5'>
                                Community
                            </Text>
                            <Text weight='medium' className='leading-5'>
                                WhatsApp
                            </Text>
                            <Text weight='medium' className='leading-5'>
                                Member
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex className='w-1/3'>
                        <Flex dir='column' gapY={5}>
                            <Text size='lg' weight='bold' className='leading-5'>
                                Subscribe to our blog
                            </Text>
                            <Text weight='medium' className='leading-5'>
                                Subscribe now to get the exclusive insights of the Artificial
                                Intelligence industry
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Container>
        </main>
    );
}
