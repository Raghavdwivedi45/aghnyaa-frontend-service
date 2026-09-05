'use client'
// https://tiptap.dev/docs/editor/extensions/nodes
import styles from "./Tiptap.module.scss";
import { useEditor, EditorContent, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { type Level } from '@tiptap/extension-heading'
// import { Details, DetailsContent, DetailsSummary } from '@tiptap/extension-details' --> for future -> need to install extension -> https://tiptap.dev/docs/editor/extensions/nodes/details
// import Image from '@tiptap/extension-image' -> https://tiptap.dev/docs/editor/extensions/nodes/image
// import Mention from '@tiptap/extension-mention' -> https://tiptap.dev/docs/editor/extensions/nodes/mention
import { TableKit } from '@tiptap/extension-table'
import Youtube from '@tiptap/extension-youtube'
import Highlight from '@tiptap/extension-highlight'; // https://tiptap.dev/docs/editor/extensions/functionality/color -> for future
// import DragHandle from '@tiptap/extension-drag-handle-react' -> https://tiptap.dev/docs/editor/extensions/functionality/drag-handle
import Link from '@tiptap/extension-link'
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import FileHandler from "@tiptap/extension-file-handler";
import { CharacterCount } from '@tiptap/extensions'
import Image from "@tiptap/extension-image";
import { Placeholder } from '@tiptap/extensions'
import { FontFamily, FontSize, TextStyle } from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import { useCallback, useState } from "react";
import SVGWithText from '@/components/SVGWithText/SVGWithText';
import Dropdown from '@/components/Dropdown/Dropdown';
import { headingList, fontFamilyList, fontSizeList, textAlignList } from '@/constants/constants';
// import { uploadImage } from "@/utils/fetchAPIFunctions";
import ButtonSet from "../ButtonSet/ButtonSet";
import ToolbarSVG from "../SVG/ToolbarSVG";
import { toolbarSVGType } from "@/constants/types";

const Tiptap = ({ content, updateContent }: { content: string, updateContent: (value: string) => void }) => {
    const [propertyType, setPropertyType] = useState<"general" | "table">("general");
    const limit = 2000;
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                blockquote: { // Type > at the beginning of a new line
                    HTMLAttributes: { // Control + Shift + B
                        class: "sanskritVerse",
                    },
                },
            }),
            Placeholder.configure({
                placeholder: 'Write something',
            }),
            // Heading -> Type # at the beginning of a new line and it will magically transform to a heading, same for ## , ### , #### , ##### and ######   -> OR	(Control + Alt + 1), (Control + Alt + 2) and so on
            // BulletList, ListItem -> Control + Shift + 8
            // HorizontalRule -> Type three dashes (---) or three underscores and a space (___ ) at the beginning of a new line
            TableKit.configure({
                table: {
                    resizable: true,
                    HTMLAttributes: {
                        class: 'rich-table',
                    }
                }
            }),
            Youtube.configure({
                controls: false,
                nocookie: true,
            }),
            Highlight.configure({ multicolor: true }), // Control + Shift + H -> Type ==two equal signs==
            Link.configure({
                openOnClick: false,
                autolink: true,
                markdownLinks: true,
                defaultProtocol: 'https',
                protocols: ['http', 'https'],
                isAllowedUri: (url, ctx) => {
                    try {
                        // construct URL
                        const parsedUrl = url.includes(':')
                            ? new URL(url)
                            : new URL(`${ctx.defaultProtocol}://${url}`)

                        // use default validation
                        if (!ctx.defaultValidate(parsedUrl.href)) {
                            return false
                        }

                        // disallowed protocols
                        const disallowedProtocols = ['ftp', 'file', 'mailto']
                        const protocol = parsedUrl.protocol.replace(':', '')

                        if (disallowedProtocols.includes(protocol)) {
                            return false
                        }

                        // only allow protocols specified in ctx.protocols
                        const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

                        if (!allowedProtocols.includes(protocol)) {
                            return false
                        }

                        // disallowed domains
                        const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
                        const domain = parsedUrl.hostname

                        if (disallowedDomains.includes(domain)) {
                            return false
                        }

                        // all checks have passed
                        return true
                    } catch {
                        return false
                    }
                },
                shouldAutoLink: url => {
                    try {
                        // construct URL
                        const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

                        // only auto-link if the domain is not in the disallowed list
                        const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
                        const domain = parsedUrl.hostname

                        return !disallowedDomains.includes(domain)
                    } catch {
                        return false
                    }
                },
            }),
            // Strike -> Type ~~ text between tildes ~~ -> OR (Control + Shift + S)
            Subscript, // Control + ,
            Superscript,
            CharacterCount.configure({
                limit, // assuming max 2000 characters allowed
                autoTrim: true, // Controls whether the initial content is automatically trimmed when it exceeds the configured limit. When set to false, initial content over the limit is preserved. While the document remains over the limit, transactions that increase the content size are blocked.
            }),
            TextStyle, FontFamily, FontSize,
            TextAlign.configure({
                types: ['heading', 'paragraph'], // nodes the alignment attribute applies to
                alignments: ['left', 'center', 'right', 'justify'], // setTextAlign(left)	Ctrl + Shift + L -> setTextAlign(center)	Ctrl + Shift + E -> setTextAlign(right)	Ctrl + Shift + R -> setTextAlign(justify)	Ctrl + Shift + J
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Image.configure({
                HTMLAttributes: { class: 'article-img' },
                resize: {
                    enabled: true,
                    directions: ['top', 'bottom', 'left', 'right'], // can be any direction or diagonal combination
                    minWidth: 50,
                    minHeight: 50,
                    alwaysPreserveAspectRatio: true,
                }
            }),
            FileHandler.configure({
                allowedMimeTypes: ["image/png", "image/jpeg", "image/webp", "image/gif"],

                // onDrop: async (editor, files, pos) => {
                //     for (const file of files) {
                //         const imageUrl = await uploadImage(file);
                //         editor.chain().insertContentAt(pos, { type: "image", attrs: { src: imageUrl, class: "article-image" } }).focus().run();
                //     }
                // },

                // onPaste: async (editor, files) => {
                //     for (const file of files) {
                //         const imageUrl = await uploadImage(file);
                //         editor.chain().insertContentAt(editor.state.selection.anchor, { type: "image", attrs: { src: imageUrl, class: "article-image" } }).focus().run();
                //     }
                // },
            })
        ],
        content: content,
        immediatelyRender: false, // Don't render immediately on the server to avoid SSR issues
        autofocus: true, // place the cursor in the editor after initialization
        editable: true, // make the text editable (default is true)
        onUpdate({ editor }) {
            updateContent(editor.getHTML());
        },
    })

    const editorState = useEditorState({
        editor,
        selector: (context: any) => ({
            canSplitListItem: context?.editor?.can()?.splitListItem('listItem') ?? false,
            canSinkListItem: context?.editor?.can()?.sinkListItem('listItem') ?? false,
            canLiftListItem: context?.editor?.can()?.liftListItem('listItem') ?? false,
            canUndo: context?.editor?.can()?.chain()?.focus()?.undo()?.run() ?? false,
            canRedo: context?.editor?.can()?.chain()?.focus()?.redo()?.run() ?? false,
            isLink: context?.editor?.isActive('link'),
            isBold: context?.editor?.isActive('bold') ?? false,
            isItalic: context?.editor?.isActive('italic') ?? false,
            isUnderline: context?.editor?.isActive('underline') ?? false,
            isBlockquote: context?.editor?.isActive('blockquote') ?? false,
            isHighlight: context?.editor?.isActive('highlight') ?? false,
            isStrike: context?.editor?.isActive('strike') ?? false,
            isSubscript: context?.editor?.isActive('subscript') ?? false,
            isSuperscript: context?.editor?.isActive('superscript') ?? false,
            isBulletList: context?.editor?.isActive('bulletList') ?? false,
            isOrderedList: context?.editor?.isActive('orderedList') ?? false,
            fontFamily: context?.editor?.getAttributes('textStyle')?.fontFamily ?? "",
            fontSize: context?.editor?.getAttributes('textStyle')?.fontSize ?? "",
            textAlign: ['left', 'center', 'right', 'justify'].find((a) => context?.editor?.isActive({ textAlign: a })) ?? "",
            headingLevel: context?.editor?.getAttributes('heading')?.level,
            charactersCount: context?.editor?.storage?.characterCount?.characters(),
            wordsCount: context?.editor?.storage?.characterCount?.words(),
        }),
    })

    const addYoutubeVideo = () => {
        const url = prompt('Enter YouTube URL')

        if (url) {
            editor?.commands?.setYoutubeVideo({
                src: url,
                width: 320,
                height: 180,
            })
        }
    }

    const addImage = useCallback(() => {
        const url = window.prompt('URL')

        if (url) {
            editor?.chain()?.focus()?.setImage({ src: url }).run()
        }
    }, [editor])

    const setLink = useCallback(() => {
        const previousUrl = editor?.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        // cancelled
        if (url === null) {
            return
        }

        // empty
        if (url === '') {
            editor?.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        // update link
        try {
            editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
        } catch (e: any) {
            alert(e?.message ? e.message : "")
        }
    }, [editor])

    const togglePropertyType = (passedType: "general" | "table") => {
        setPropertyType(passedType)
    }


    if (!editor) {
        return null
    }

    const generalButtons = [
        { value: "Unset link", onClick: () => editor.chain().focus().unsetLink().run(), disabled: !editorState?.isLink },
        { value: "Unset font family", onClick: () => editor.chain().focus().unsetFontFamily().run(), disabled: !editorState?.fontFamily },
        { value: "Unset font size", onClick: () => editor.chain().focus().unsetFontSize().run(), disabled: !editorState?.fontSize },
        { value: "Unset heading", onClick: () => editor.chain().focus().setParagraph().run(), disabled: !editorState?.headingLevel },
        { value: "Split list item", onClick: () => editor?.chain().focus().splitListItem('listItem').run(), disabled: !editorState?.canSplitListItem },
        { value: "Sink list item", onClick: () => editor?.chain().focus().sinkListItem('listItem').run(), disabled: !editorState?.canSinkListItem },
        { value: "Lift list item", onClick: () => editor?.chain().focus().liftListItem('listItem').run(), disabled: !editorState?.canLiftListItem },
    ]

    const generalSVGs: {
        value: toolbarSVGType; title: string; onClick: (() => boolean) | (() => void); disabled?: boolean; active?: boolean;
    }[] = [
            { value: "undo", title: "Undo", onClick: () => editor.chain().focus().undo().run(), disabled: !editorState?.canUndo, },
            { value: "redo", title: "Redo", onClick: () => editor.chain().focus().redo().run(), disabled: !editorState?.canRedo, },
            { value: "bold", title: "Bold", onClick: () => editor.chain().focus().toggleBold().run(), active: editorState?.isBold, },
            { value: "italic", title: "Italic", onClick: () => editor.chain().focus().toggleItalic().run(), active: editorState?.isItalic, },
            { value: "underline", title: "Underline", onClick: () => editor.chain().focus().toggleUnderline().run(), active: editorState?.isUnderline, },
            { value: "quote", title: "Block Quote", onClick: () => editor.chain().focus().toggleBlockquote().run(), active: editorState?.isBlockquote, },
            { value: "new-line", title: "Insert Line Break", onClick: () => editor.chain().focus().setHardBreak().run(), },
            { value: "separator", title: "Insert Horizontal Rule", onClick: () => editor.chain().focus().setHorizontalRule().run(), },
            { value: "youTube-video", title: "Insert YouTube Video", onClick: addYoutubeVideo, },
            { value: "image", title: "Insert Image", onClick: addImage, },
            { value: "highlight", title: "Highlight Text", onClick: () => editor.chain().focus().toggleHighlight({ color: "#ffc078" }).run(), active: editorState?.isHighlight, },
            { value: "link", title: "Insert/Edit Link", onClick: setLink, active: editorState?.isLink, },
            { value: "strikethrough", title: "Strikethrough", onClick: () => editor.chain().focus().toggleStrike().run(), active: editorState?.isStrike, },
            { value: "subscript", title: "Subscript", onClick: () => editor.chain().focus().toggleSubscript().run(), active: editorState?.isSubscript, },
            { value: "superscript", title: "Superscript", onClick: () => editor.chain().focus().toggleSuperscript().run(), active: editorState?.isSuperscript, },
            { value: "bullet-list", title: "Bullet List", onClick: () => editor.chain().focus().toggleBulletList().run(), active: editorState?.isBulletList, },
            { value: "number-list", title: "Numbered List", onClick: () => editor.chain().focus().toggleOrderedList().run(), active: editorState?.isOrderedList, }
        ];

    const tableButtons = [
        { value: "Insert table", onClick: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
        { value: "Add column before", onClick: () => editor.chain().focus().addColumnBefore().run() },
        { value: "Add column after", onClick: () => editor.chain().focus().addColumnAfter().run() },
        { value: "Delete column", onClick: () => editor.chain().focus().deleteColumn().run() },
        { value: "Add row before", onClick: () => editor.chain().focus().addRowBefore().run() },
        { value: "Add row after", onClick: () => editor.chain().focus().addRowAfter().run() },
        { value: "Delete row", onClick: () => editor.chain().focus().deleteRow().run() },
        { value: "Delete table", onClick: () => editor.chain().focus().deleteTable().run() },
        { value: "Merge cells", onClick: () => editor.chain().focus().mergeCells().run() },
        { value: "Split cell", onClick: () => editor.chain().focus().splitCell().run() },
        { value: "Toggle header column", onClick: () => editor.chain().focus().toggleHeaderColumn().run() },
        { value: "Toggle header row", onClick: () => editor.chain().focus().toggleHeaderRow().run() },
        { value: "Toggle header cell", onClick: () => editor.chain().focus().toggleHeaderCell().run() },
        { value: "Merge or split", onClick: () => editor.chain().focus().mergeOrSplit().run() },
        { value: "Set cell attribute", onClick: () => editor.chain().focus().setCellAttribute('colspan', 2).run() },
        { value: "Fix tables", onClick: () => editor.chain().focus().fixTables().run() },
        { value: "Go to next cell", onClick: () => editor.chain().focus().goToNextCell().run() },
        { value: "Go to previous cell", onClick: () => editor.chain().focus().goToPreviousCell().run() },
    ]

    return (
        <>
            <div className={styles["toolbar-container"]}>
                <div className={styles["toolbar-container-box-container"]}>
                    <ButtonSet
                        primaryText="General Properties"
                        secondaryText="Table Properties"
                        onPrimaryClick={() => togglePropertyType("general")}
                        onSecondaryClick={() => togglePropertyType("table")}
                        disablePrimary={propertyType === "general"}
                        disableSecondary={propertyType === "table"}
                    />
                </div>


                {
                    propertyType === "general" &&
                    <div className={styles["toolbar-container-box-container"]}>
                        <div className={styles["toolbox-container-left"]}>
                            {
                                generalSVGs.map((btn, idx) => (
                                    <button key={idx} className={`${styles["toolbar-svg-button"]}${btn.active ? ` ${styles["toolbar-svg-button-active"]}` : ""}`} onClick={btn.onClick} disabled={btn.disabled} >
                                        <ToolbarSVG color="var(--button-primary-text)" size={24} type={btn.value} />
                                        <span className={styles["toolbar-svg-button-title"]}>{btn.title}</span>
                                    </button>
                                ))
                            }
                            {
                                generalButtons.map((btn, idx) => (
                                    <button key={idx} onClick={btn.onClick} disabled={btn.disabled}>
                                        <SVGWithText value={btn.value} withDesign={true} index={idx} />
                                    </button>
                                ))
                            }
                        </div>
                        <div className={styles["toolbox-container-right"]}>
                            <Dropdown
                                placeholder={editorState?.headingLevel ? undefined : 'Heading'}
                                selectedValue={editorState?.headingLevel}
                                dropdownList={headingList}
                                onOptionSelect={(val) => editor?.chain().focus().toggleHeading({ level: Number(val) as Level }).run()}
                            />
                            <Dropdown
                                placeholder={editorState?.fontFamily ? undefined : 'Font family'}
                                selectedValue={editorState?.fontFamily}
                                dropdownList={fontFamilyList}
                                onOptionSelect={(val) => editor?.chain().focus().setFontFamily(String(val)).run()}
                            />
                            <Dropdown
                                placeholder={editorState?.fontSize ? undefined : 'Font size'}
                                selectedValue={editorState?.fontSize}
                                dropdownList={fontSizeList}
                                onOptionSelect={(val) => editor?.chain().focus().setFontSize(String(val)).run()}
                            />
                            <Dropdown
                                placeholder={editorState?.textAlign ? undefined : 'Text align'}
                                selectedValue={editorState?.textAlign ?? ""}
                                dropdownList={textAlignList}
                                onOptionSelect={(val) => editor?.chain().focus().toggleTextAlign(String(val)).run()}
                            />
                        </div>
                    </div>
                }

                {
                    propertyType === "table" &&
                    <div className={styles["toolbar-container-box-container"]}>
                        <div className={styles["toolbox-container-left"]}>
                            {
                                tableButtons.map((btn, idx) => (
                                    <button key={idx} onClick={btn.onClick}>
                                        <SVGWithText value={btn.value} withDesign={true} index={idx} />
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                }
            </div>

            <EditorContent editor={editor} className={styles["editor-container"]} />

            <div className={styles["toolbar-container-character-count"]}>
                Character Count = {editorState?.charactersCount}
                <br />
                Word Count = {editorState?.wordsCount}
            </div>
        </>
    )
}

export default Tiptap
