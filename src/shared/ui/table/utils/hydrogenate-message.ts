export const hydrogenateMessage = (message: string, obj: Record<string, any>): string => {

    const regex = /#(\S*?)#/g;

    const variables = message.match(regex);

    if (variables) {

        let newMessage = message;

        variables.forEach(template => {

            const key = template.slice(1, -1);

            if (key in obj && (typeof obj[ key ] === 'string' || typeof obj[ key ] === 'number')) {

                newMessage = newMessage.replace(template, (obj[ key ] as string).toString());

            }

        });

        return newMessage;

    }

    return message;

};
