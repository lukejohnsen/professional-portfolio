import CodeBlock from "./CodeBlock";
import CodeTabs from "./CodeTabs";
import AboutSection from "./AboutSection";

export default function ProjectCard({
  image,
  title,
  description,
  technologies,
  liveUrl,
  githubUrl,
  codeSnippet,
  codeBlocks,
  codeLanguage,
  codeTitle,
  aboutContent,
}) {
  return (
    <div className="border border-gray-500 rounded-md p-5 flex-1 flex flex-col">
      <div className="flex-grow">
        <img src={image} className="w-full h-auto rounded-md" alt={title} />
        <h3 className="text-2xl font-semibold mt-8">{title}</h3>
        <p className="text-gray-400 text-sm mt-2">{description}</p>
        {technologies && (
          <div className="flex flex-wrap gap-2 mt-4">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-gray-800 rounded-full text-cyan-400"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {aboutContent && <AboutSection content={aboutContent} />}

        {codeBlocks ? (
          <CodeTabs codeBlocks={codeBlocks} language={codeLanguage} />
        ) : codeSnippet ? (
          <CodeBlock
            code={codeSnippet}
            language={codeLanguage}
            title={codeTitle}
          />
        ) : null}
      </div>

      <div className="flex gap-2 mt-8">
        {liveUrl && (
          <a
            className="flex-1 text-sm text-center py-3 bg-gradient-to-t from-blue-500 rounded-full to-cyan-500 hover:from-blue-700 hover:to-cyan-700"
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Preview
          </a>
        )}
        {githubUrl && (
          <a
            className="flex-1 text-sm text-center py-3 bg-gradient-to-t from-blue-500 rounded-full to-cyan-500 hover:from-blue-700 hover:to-cyan-700"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}
