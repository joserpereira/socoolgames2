const formatText = (text: string) => {
    if (text)
        return text.replaceAll('\n', '<br />')
    return "";
}


export { formatText };