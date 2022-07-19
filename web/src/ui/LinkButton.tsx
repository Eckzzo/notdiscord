import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { styled } from '@stitches';

const StyledLinkButton = styled('button', {
	height: '$7',
	px: '$2',
	borderRadius: '$2',
	fontSize: '$1',
	fontWeight: '$medium',
	lineHeight: '$2',
	color: '$violetText',
	backgroundColor: 'transparent',
	border: 'none',
	transition: 'background-color 0.2s ease',
	'&:hover': {
		cursor: 'pointer',
		backgroundColor: '$violetA200',
	},
	variants: {
		active: {
			true: {
				backgroundColor: '$violetA200',
				'&:hover': {
					cursor: 'default',
					backgroundColor: '$violetA200',
				},
			},
		},
	},
});

interface LinkButtonProps extends React.ComponentPropsWithRef<'button'> {
	href: string;
}

const LinkButton = React.forwardRef<HTMLButtonElement, LinkButtonProps>(
	({ href, children, ...props }, ref) => {
		const router = useRouter();

		return (
			<NextLink href={href} passHref>
				<StyledLinkButton
					ref={ref}
					role="link"
					active={router.asPath === href}
					{...props}
				>
					{children}
				</StyledLinkButton>
			</NextLink>
		);
	}
);

LinkButton.displayName = 'LinkButton';

export { LinkButton };
