const formatText = (text) => {
    if (text)
        return text.replaceAll('\n', '<br />')
    return "";
}


export { formatText };