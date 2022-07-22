import React from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { styled } from '@stitches';
import { overlayStyles } from './Overlay';
import { IconButton } from './IconButton';
import {
	fadeIn,
	fadeOut,
	fadeStyles,
	moveIn,
	moveOut,
	moveStyles,
} from './Animation';

/* -------------------------------------------------------------------------------------------------
 * Styled Items
 * ----------------------------------------------------------------------------------------------- */

const StyledContent = styled(DialogPrimitive.Content, moveStyles, {
	position: 'fixed',
	top: '50%',
	left: '50%',
	width: '440px',
	maxHeight: '80vh',
	padding: '$6',
	mt: '-5vh',
	backgroundColor: '$panel',
	borderRadius: '$3',
	transform: 'translate(-50%, -50%)',
	willChange: 'transform',
	zIndex: '2000',
	'&[data-state="open"]': {
		animationName: `${moveIn.top}`,
	},
	'&[data-state="closed"]': {
		animationDuration: '200ms',
		animationName: `${moveOut.bottom}`,
	},
});

/* -------------------------------------------------------------------------------------------------
 * Overlay
 * ----------------------------------------------------------------------------------------------- */

const Overlay = styled(DialogPrimitive.Overlay, overlayStyles, fadeStyles, {
	position: 'fixed',
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
	zIndex: '1000',
	'&[data-state="open"]': {
		animationName: `${fadeIn}`,
	},
	'&[data-state="closed"]': {
		animationName: `${fadeOut}`,
	},
});

Overlay.displayName = 'Dialog.Overlay';

/* -------------------------------------------------------------------------------------------------
 * Close
 * ----------------------------------------------------------------------------------------------- */

const Close = styled(DialogPrimitive.Close, {
	position: 'absolute',
	top: '$5',
	right: '$5',
});

Close.displayName = 'Dialog.Close';

/* -------------------------------------------------------------------------------------------------
 * Content
 * ----------------------------------------------------------------------------------------------- */

interface DialogContentProps
	extends React.ComponentProps<typeof DialogPrimitive.Content> {
	children?: React.ReactNode;
}

const Content = React.forwardRef<
	React.ElementRef<typeof StyledContent>,
	DialogContentProps
>(({ children, ...props }, ref) => (
	<StyledContent {...props} ref={ref}>
		{children}
		<Close asChild>
			<IconButton size="sm" variant="ghost">
				<Cross1Icon />
			</IconButton>
		</Close>
	</StyledContent>
));

Content.displayName = 'Dialog.Content';

/* -------------------------------------------------------------------------------------------------
 * Dialog
 * ----------------------------------------------------------------------------------------------- */

interface DialogProps
	extends React.ComponentProps<typeof DialogPrimitive.Root> {
	children?: React.ReactNode;
}

interface DialogComposition {
	Content: typeof Content;
	Close: typeof DialogPrimitive.Close;
	Title: typeof DialogPrimitive.Title;
	Trigger: typeof DialogPrimitive.Trigger;
	Description: typeof DialogPrimitive.Description;
}

const Dialog: React.FC<DialogProps> & DialogComposition = ({
	children,
	...props
}) => {
	return (
		<DialogPrimitive.Root {...props}>
			<Overlay />
			{children}
		</DialogPrimitive.Root>
	);
};

Dialog.Content = Content;
Dialog.Close = DialogPrimitive.Close;
Dialog.Title = DialogPrimitive.Title;
Dialog.Trigger = DialogPrimitive.Trigger;
Dialog.Description = DialogPrimitive.Description;

export { Dialog };
